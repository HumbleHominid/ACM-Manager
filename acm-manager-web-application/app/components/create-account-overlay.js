import AbstractOverlay from './abstract-overlay';
import Ember from 'ember';

export default AbstractOverlay.extend({
  actions: {
    createAccount() {
      let user = { };

      //need tests for matching email and password
      //this is still bad. should use forms not thing
      user.first = document.getElementById('fName').value;
      user.last = document.getElementById('lName').value;
      user.username = document.getElementById('email').value;
      user.password = document.getElementById('password').value;

      let samePass = user.password === document.getElementById('confirmPassword').value;
      let sameEmail = user.username === document.getElementById('confirmEmail').value;

      if (!samePass || !sameEmail) {
        alert('Email or passwords do not match');
        return;
      }

      user = JSON.stringify(user);

      //ehh. 
      Ember.$.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: 'https://katie.mtech.edu/~acmuser/backend/login',
        data: user
      });
    }
  }
});
