import Ember from 'ember';
import GenericModal from './generic-modal';

export default GenericModal.extend({
  session: Ember.inject.service(),

  actions: {
    authenticate() {
      (function(component) {
        component.get('session').authenticate('authenticator:auth', {
          task: "ATTEMPT_LOGIN",
          username: component.$('#log-in-email')[0].value,
          password: component.$('#log-in-password')[0].value
        }).then(() => {
          let rememberMe = component.$('#log-in-checkbox')[0].checked;
          let cookieTimeout = (rememberMe ? (14 * 24 * 60 * 60) : null);

          component.set('session.store.cookieTimeout', cookieTimeout);
          
          component.get('loginCallback') (rememberMe);
          
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
