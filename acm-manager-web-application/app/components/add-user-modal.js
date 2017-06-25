import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createAccount() {
      let user = { };

      user.first = this.$("#" + "fName").value;
      user.last = this.$("#" + "lName").value;
      user.username = this.$("#" + "email").value;
      
      let sameEmail = user.username === this.$("#" + "confirmEmail").value;

      if (!sameEmail) {
        alert('Emails do not match');
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
