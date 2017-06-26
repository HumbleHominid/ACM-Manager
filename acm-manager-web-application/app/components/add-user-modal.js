import Ember from 'ember';
import generator from 'npm:generate-password';

export default Ember.Component.extend({
  password: "",
  
  actions: {
    createAccount() {
      let user = { };

      user.first = this.$("#add-user-first-name")[0].value;
      user.last = this.$("#add-user-last-name")[0].value;
      user.username = this.$("#add-user-email")[0].value;
      user.password = this.get('password');
      
      let sameEmail = user.username === this.$("#add-user-confirm-email")[0].value;

      if (!sameEmail) {
        if (!this.$("#add-user-alert-text")[0]) {
          this.$("form").prepend('<div class="alert alert-danger alert-dismissable fade in form-margin"><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button><span id="add-user-alert-text">Emails do not match</span></div>');
        }
        else {
          let alertTextSpan = this.$("#add-user-alert-text")[0];
          
          if (alertTextSpan.innerHTML.indexOf("again") !== -1) {
            alertTextSpan.innerHTML = alertTextSpan.innerHTML + ", and again";
          }
          else {
            alertTextSpan.innerHTML = alertTextSpan.innerHTML + " again";
          }
        }
        return false;
      }

      user = JSON.stringify(user);

      (function(component) {
        Ember.$.ajax({
          type: 'PUT',
          contentType: 'application/json',
          url: 'https://katie.mtech.edu/~acmuser/backend/login',
          data: user
        }).then(function() {
          component.$("#add-user-modal").modal('hide');
        });
      })(this);
      
      return false;
    },
    generatePassword() {
      this.set('password', generator.generate({
        length: 8,
        numbers: true,
        symbols: true,
        strict: true
      }));
    }
  }
});
