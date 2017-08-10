import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  _notify: service('notify'),
  session: service(),
  currentUser: service(),
  
  modalPrefix: "create-event-type",
  
  didRender() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    
    $(`#${modalPrefix}-modal`).on('shown.bs.modal', () => {
      $(`#${modalPrefix}-name`).focus();
    }).on('hidden.bs.modal', () => {
      $(`#${modalPrefix}-form`)[0].reset();
    });
  },
  actions: {
    formSubmit(e) {
      "use strict";
      
      if (!e.isTrusted) {
        return;
      }
      
      return false;
    }
  }
});
