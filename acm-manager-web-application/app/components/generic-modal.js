import Ember from 'ember';

const { $ } = Ember;

export default Ember.Component.extend({
  modalPrefix: 'generic',
  first: '',
  reset: true,
  
  didInsertElement() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    
    $(`#${modalPrefix}-modal`).on('shown.bs.modal', () => {
      $(`#${modalPrefix}-${this.get('first')}`).focus();
    }).on('hidden.bs.modal', () => {
      let el = $(`#${modalPrefix}-form`)[0];
      
      if (el) {
        el.reset();
      }
    });
  },
  actions: {
    formSubmit() {
      "use strict";
      
      this.get('formAction') ();
      
      return false;
    }
  }
});
