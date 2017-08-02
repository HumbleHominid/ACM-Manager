import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: service(),
  notify: service(),

  actions: {
    authenticate() {
      "use strict";
      
      let rememberMe = this.$('#log-in-checkbox')[0].checked;
      
      if (rememberMe) {
        let cookieTimeout = 14 * 24 * 60 * 60;
        
        this.set('session.store.cookieExpirationTime', cookieTimeout);
      }
          
      (function(component) {
        component.get('session').authenticate('authenticator:auth', {
          task: "ATTEMPT_LOGIN",
          username: component.$('#log-in-email')[0].value,
          password: component.$('#log-in-password')[0].value,
          rememberMe: rememberMe
        }).then(() => {
          component.get('loginCallback') ();
          
          component.$('#log-in-form')[0].reset();
          
          component.$("#log-in-modal").modal('hide');
        }).catch((/* reason */) => {
          component.get('notify').alert("Incorrect username or password.", {
            closeAfter: 3000,
            radius: true
          });
        });
      }) (this);

      return false;
    }
  }
});
