import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  session: service(),
  _notify: service('notify'),
  
  modalPrefix: 'log-in',
  
  didRender() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    let modal = $(`#${modalPrefix}-modal`);
    
    modal.on('shown.bs.modal', () => {
      $(`#${modalPrefix}-email`).focus();
    });
    
    modal.on('hidden.bs.modal', () => {
      $(`#${modalPrefix}-form`)[0].reset();
    });
  },
  actions: {
    authenticate() {
      "use strict";
      
      let modalPrefix = this.get('modalPrefix');
      let rememberMe = $(`#${modalPrefix}-checkbox`)[0].checked;
      
      if (rememberMe) {
        let cookieTimeout = 14 * 24 * 60 * 60;
        
        this.set('session.store.cookieExpirationTime', cookieTimeout);
      }
      
      (function(component) {
        component.get('session').authenticate('authenticator:auth', {
          task: "ATTEMPT_LOGIN",
          username: $(`#${modalPrefix}-email`)[0].value,
          password: $(`#${modalPrefix}-password`)[0].value,
          rememberMe: rememberMe
        }).then(() => {
          component.get('loginCallback') ();
          
          $(`#${modalPrefix}-modal`).modal('hide');
        }).catch((/* reason */) => {
          component.get('_notify').alert("Incorrect username or password.", {
            closeAfter: 3 * 1000,
            radius: true
          });
        });
      }) (this);

      return false;
    }
  }
});
