import Ember from 'ember';
import GenericModal from './generic-modal';

export default GenericModal.extend({  
  actions: {
    createAccount() {
      let obj = { data: { } };

      obj.task = "CREATE_ACCOUNT";
      obj.data.first = this.$("#create-account-first-name")[0].value;
      obj.data.last = this.$("#create-account-last-name")[0].value;
      obj.data.username = this.$("#create-account-email")[0].value;
      obj.data.password = this.$("#create-account-password")[0].value;

      let sameEmail = obj.data.username === this.$("#create-account-confirm-email")[0].value;
      let samePass = obj.data.password === this.$("#create-account-confirm-password")[0].value;

      if (!samePass || !sameEmail) {
        if (!this.$("#create-account-error-alert")[0]) {
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

      obj = JSON.stringify(obj);console.log(obj)

      (function(component) {
        Ember.$.ajax({
          type: 'PUT',
          contentType: 'application/json',
          url: 'https://katie.mtech.edu/~acmuser/backend/login',
          data: obj
        }).done(function() {
          component.$("#create-account-form")[0].reset();
          
          component.$("#create-account-modal").modal('hide');
          
          if (component.$("#create-account-error-alert")[0]) {
            component.$("#create-account-error-alert")[0].remove();
          }
          
          component.get('notify').success("Account created! You can now log in!", {
            closeAfter: 3000,
            radius: true
          });
        }).fail(function(/* jqXHW, textStatus, err */) {
          if (!component.$("#create-account-submit-error-alert")[0]) {
            component.$("form").prepend('<div id="create-account-submit-error-alert" class="alert alert-danger alert-dismissable fade in form-margin"><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button><span id="create-account-submit-error-alert-text">There was an error creating your account at this time.</span></div>');
          }
          else {
            let alertTextSpan = component.$("#create-account-submit-error-alert-text")[0];
            
            if (alertTextSpan.innerHTML.indexOf("again") !== -1) {
              alertTextSpan.innerHTML = alertTextSpan.innerHTML + ", and again";
            }
            else {
              alertTextSpan.innerHTML = alertTextSpan.innerHTML + " again";
            }
          }
        });
      }) (this);
      
      return false;
    }
  }
});
