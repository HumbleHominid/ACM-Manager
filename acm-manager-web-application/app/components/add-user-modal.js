import Ember from 'ember';
import generator from 'npm:generate-password';
import GenericModal from './generic-modal';

export default GenericModal.extend({  
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
        if (!this.$("#add-user-error-alert-text")[0]) {
          this.$("form").prepend('<div id="add-user-error-alert" class="alert alert-danger alert-dismissable fade in form-margin"><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button><span id="add-user-error-alert-text">Emails do not match</span></div>');
        }
        else {
          let alertTextSpan = this.$("#add-user-error-alert-text")[0];
          
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
          this.$("form").prepend('<div id="add-user-success-alert" class="alert alert-danger alert-dismissable fade in form-margin"><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button><span id="add-user-success-alert-text"><strong>User Added</strong></span></div>');
          
          component.$("#add-user-first-name")[0].value = "";
          component.$("#add-user-last-name")[0].value = "";
          component.$("#add-user-email")[0].value = "";
          component.$("#add-user-confirm-email")[0].value = "";
          component.$("#add-user-password")[0].value = "";
          component.$("#add-user-confirm-password")[0].value = "";
          
          component.$("#add-user-modal").modal('hide');
          
          if (component.$("#add-user-error-alert")) {
            component.$("#add-user-error-alert")[0].remove();
          }
          
          component.get('notify').success("Account created! User can now login.", {
            closeAfter: 3000
          });
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
