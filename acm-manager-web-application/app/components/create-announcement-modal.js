import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  _notify: service('notify'),
  currentUser: service(),
  _announcements: service('announcements'),
  _metadata: service('metadata'),
   
  modalPrefix: "create-announcement",
  first: "message",
  
  actions: {
    createAnnoncement() {
      "use strict";
      
      let currentUser = this.get('currentUser');
      let modalPrefix = this.get('modalPrefix');
        
      let data = {
        message: $(`#${modalPrefix}-message`)[0].value,
        startTime: $(`#${modalPrefix}-startTime`)[0].value,
        endTime: $(`#${modalPrefix}-endTime`)[0].value,
        user_type: $(`#${modalPrefix}-audience`)[0].value,
        creator_id: currentUser.get('id')
      };
      
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: `${this.get('_metadata.url')}announcements`,
        data: JSON.stringify({
          task: "CREATE_ANNO",
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
        
        let annoData = data.annoData;
        let startTime = new Date(annoData.startTime.replace(' ', 'T')).toString();
        
        this.get('_notify').success(`New announcement created with message: "${annoData.message}". To start at ${startTime}.`, {
          radius: true,
          closeAfter: 3 * 1000
        });
      }).fail(() => {
        this.get('_notify').alert("Failed to create a new announcement.", {
          radius: true,
          closeAfter: 3 * 1000
        });
      });
      
      return false;
    }
  }
});
