import AbstractOverlay from './abstract-overlay';
import Ember from 'ember';

export default AbstractOverlay.extend({
  actions: {
    createAccount() {
      let user = { };

      user.first = document.getElementById('fName').value;
      user.last = document.getElementById('lName').value;
      user.username = document.getElementById('email').value;
      user.password = document.getElementById('password').value;

      Ember.$.ajax({
        type: 'PUT',
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
