import Ember from 'ember';

const { $ } = Ember;

export default Ember.Component.extend({
  modalPrefix: 'contact-us',
  
  didRender() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    
    $(`#${modalPrefix}-modal`).on('shown.bs.modal', () => {
      $(`#${modalPrefix}-first`).focus();
    }).on('hidden.bs.modal', () => {
      $(`#${modalPrefix}-form`)[0].reset();
    });
  }
});
