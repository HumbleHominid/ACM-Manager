import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createAccount() {
      let user = { };

      user.first = this.$("#create-account-first-name").value;
      user.last = this.$("#create-account-last-name").value;
      user.username = this.$("#create-account-email").value;
      user.password = this.$("#create-account-password").value;

      let sameEmail = user.username === this.$("#create-account-email").value;
      let samePass = user.password === this.$("#create-account-confirm-password").value;

      if (!samePass || !sameEmail) {
        alert('Emails or passwords do not match');
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
