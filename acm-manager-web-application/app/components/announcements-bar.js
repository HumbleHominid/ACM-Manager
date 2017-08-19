import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  currentUser: service(),
  announcements: service(),
  events: service(),
  
  annonData: null,
  
  actions: {
    showEditModal(data) {
      "use strict";
      
      this.set('annonData', data);
      
      $(`#edit-announcement-modal`).modal();
    }
  }
});
