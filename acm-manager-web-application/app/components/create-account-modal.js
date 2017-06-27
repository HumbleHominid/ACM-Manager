import Ember from 'ember';
import GenericModal from './generic-modal';

export default GenericModal.extend({  
  actions: {
    createAccount() {
      let user = { };

      user.first = this.$("#create-account-first-name")[0].value;
      user.last = this.$("#create-account-last-name")[0].value;
      user.username = this.$("#create-account-email")[0].value;
      user.password = this.$("#create-account-password")[0].value;

      let sameEmail = user.username === this.$("#create-account-confirm-email")[0].value;
      let samePass = user.password === this.$("#create-account-confirm-password")[0].value;

      if (!samePass || !sameEmail) {
        if (!this.$("#create-account-error-alert-text")[0]) {
          this.$("form").prepend('<div id="create-account-error-alert" class="alert alert-danger alert-dismissable fade in form-margin"><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button><span id="create-account-error-alert-text">Emails or Passwords do not match</span></div>');
        }
        else {
          let alertTextSpan = this.$("#create-account-error-alert-text")[0];
          
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
          component.$("form").prepend('<div id="create-account-success-alert" class="alert alert-success alert-dismissable fade in form-margin"><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button><span id="create-account-success-text"><strong>Account Created.</strong></span></div>');
          
          component.$("#create-account-first-name")[0].value = "";
          component.$("#create-account-last-name")[0].value = "";
          component.$("#create-account-email")[0].value = "";
          component.$("#create-account-confirm-email")[0].value = "";
          component.$("#create-account-password")[0].value = "";
          component.$("#create-account-confirm-password")[0].value = "";
          
          component.$("#create-account-modal").modal('hide');
          
          if (component.$("#create-account-error-alert")) {
            component.$("#create-account-error-alert")[0].remove();
          }
          
          component.get('notify').success("Account created! You can now log in!", {
            closeAfter: 3000,
            radius: true
          });
        }).fail(function() {
          
        });
      })(this);
      
      return false;
    }
  }
});
