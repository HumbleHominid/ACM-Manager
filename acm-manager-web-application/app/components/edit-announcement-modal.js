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
    
    $(`${this.get('modalPrefix')}-audience`).val(this.get('annonData.user_type'));
  },
  actions: {
    editAnnouncement() {
      "use strict";
      
      return false;
    }
  }
});
