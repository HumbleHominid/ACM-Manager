import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  _notify: service('notify'),
  currentUser: service(),
  _announcements: service('announcements'),
  _metadata: service('metadata'),
   
  modalPrefix: "edit-announcement",
  first: "message",
  annonData: null,
  
  didInsertElement() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    
    $(`#${modalPrefix}-modal`).on('hidden.bs.modal', () => {
      this.set('annonData', null);
    });
  },
  startTime: Ember.computed('annonData', function() {
    "use strict";
    
    let startTime = this.get('annonData.startTime');
    
    return startTime ? startTime.replace(' ', 'T') : null;
  }),
  endTime: Ember.computed('annonData', function() {
    "use strict";
    
    let endTime = this.get('annonData.endTime');
    
    return endTime ? endTime.replace(' ', 'T') : null;
  }),
  actions: {
    editAnnouncement() {
      "use strict";
      
      let currentUser = this.get('currentUser');
      let modalPrefix = this.get('modalPrefix');
        
      let data = {
        message: $(`#${modalPrefix}-message`)[0].value,
        startTime: $(`#${modalPrefix}-startTime`)[0].value,
        endTime: $(`#${modalPrefix}-endTime`)[0].value,
        user_type: $(`#${modalPrefix}-audience`)[0].value,
        creator_id: currentUser.get('id'),
        anno_id: this.get('annonData.anno_id')
      };
      
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: `${this.get('_metadata.url')}announcements`,
        data: JSON.stringify({
          task: "UPDATE_ANNO",
          token: currentUser.get('token'),
          data: data
        })
      }).done((data) => {
        if (Ember.isPresent(data.reason)) {
          this.get('_notify').alert(`${data.reason}`, {
            radius: true,
            closeAfter: 3 * 1000
          });
          
          return false;
        }
        
        this.get('_announcements').load();
        
        $(`#${modalPrefix}-modal`).modal('hide');
        
        let annonData = data.annoData;
        let startTime = new Date(annonData.startTime.replace(' ', 'T')).toString();
        
        this.get('_notify').success(`Updated announcement with message: "${annonData.message}", and start at ${startTime}.`, {
          radius: true,
          closeAfter: 3 * 1000
        });
      }).fail(() => {
        this.get('_notify').alert("Failed to update a new announcement.", {
          radius: true,
          closeAfter: 3 * 1000
        });
      });
      
      return false;
    }
  }
});
