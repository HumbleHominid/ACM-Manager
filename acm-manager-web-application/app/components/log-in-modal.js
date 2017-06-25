import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  
  actions: {
    onCreateAccountButtonPress() {
      this.get('createAccountCallback') ();
    },
    authenticate() {
      let user = { };
      let obj = this;

      user.username = this.$('#log-in-email').value;
      user.password = this.$('#log-in-password').value;

      user = JSON.stringify(user);

      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://katie.mtech.edu/~acmuser/backend/login',
        data: user
      }).done(function(data) {
        obj.get('submitCallback') (data);
      });
    }
  }
});
