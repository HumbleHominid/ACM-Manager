import AbstractOverlay from './abstract-overlay';
import Ember from 'ember';

export default AbstractOverlay.extend({
  session: Ember.inject.service(),

  actions: {
    onCreateAccountButtonPress() {
      this.get('createAccountCallback')();
    },
    authenticate() {
      let user = { };
      let obj = this;

      //this is not the best way. infact this is dumb way
      user.username = document.getElementById('email').value;
      user.password = document.getElementById('password').value;

      user = JSON.stringify(user);

      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://katie.mtech.edu/~acmuser/backend/login',
        data: user
      }).done(function(data) {
        obj.get('submitCallback')(data);
      });
    }
  }
});
  
