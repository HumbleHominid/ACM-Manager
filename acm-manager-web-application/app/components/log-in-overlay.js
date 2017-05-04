import AbstractOverlay from './abstract-overlay';
import Ember from 'ember';

export default AbstractOverlay.extend({
  session: Ember.inject.service(),

  actions: {
    onCreateAccountButtonPress() {
      this.get('createAccountCallback')();
    },
    onResetPasswordButtonPress() {
      this.get('resetPasswordCallback')();
    },
    authenticate() {
      let email = document.getElementById('email').value;
      let pass = document.getElementById('password').value;

      this.get('session').authenticate('authenticator:oauth2', email, pass).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
