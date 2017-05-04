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
      let user = { };

      user.username = document.getElementById('email').value;
      user.password = document.getElementById('password').value;

      Ember.$.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'https://katie.mtech.edu/~acmuser/backend/login',
        data: user,
        success: function(data) {
          console.log(data);
        },
        error: function(req, err) {
          console.log(req.responseText);
        }
      });
    }
  }
});
