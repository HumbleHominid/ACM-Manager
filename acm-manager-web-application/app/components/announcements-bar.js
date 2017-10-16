import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  currentUser: service(),
  announcements: service(),
  events: service(),
  
  annonData: null,
  
  didInsertElement() {
    "use strict";
    
    $(`#edit-announcement-modal`).on('hidden.bs.modal', () => {
      this.set('annonData', null);
    });
  },
  actions: {
    showEditModal(data) {
      "use strict";
      
      this.set('annonData', Ember.copy(data, true));
      
      $(`#edit-announcement-modal`).modal();
    }
  }
});
