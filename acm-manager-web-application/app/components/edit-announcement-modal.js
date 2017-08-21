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
      
      return false;
    }
  }
});
