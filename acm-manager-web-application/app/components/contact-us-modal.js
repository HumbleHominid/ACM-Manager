import Ember from 'ember';

const { $ } = Ember;

export default Ember.Component.extend({
  modalPrefix: 'contact-us',
  
  didRender() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    let modal = $(`#${modalPrefix}-modal`);
    
    modal.on('shown.bs.modal', () => {
      $(`#${modalPrefix}-first`).focus();
    });
    
    modal.on('hidden.bs.modal', () => {
      $(`#${modalPrefix}-form`)[0].reset();
    });
  },
});
