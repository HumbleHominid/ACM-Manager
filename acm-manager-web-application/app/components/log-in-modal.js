import Ember from 'ember';
import GenericModal from './generic-modal';

export default GenericModal.extend({  
  actions: {
    onCreateAccountButtonPress() {
      this.get('createAccountCallback') ();
    },
    authenticate() {
      let data = { data: { } };
      
      data.task = "ATTEMPT_LOGIN";
      data.data.username = this.$('#log-in-email')[0].value;
      data.data.password = this.$('#log-in-password')[0].value;

      data = JSON.stringify(data);

      (function(component) {
        Ember.$.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: 'https://katie.mtech.edu/~acmuser/backend/login',
          data: data
        }).success(function(data) {
          let user = data.user;

          user.rememberMe = component.$("#log-in-checkbox")[0].checked;
          
          component.get('submitCallback') (user);
          
          component.$('#log-in-form')[0].reset();
          
          component.$("#log-in-modal").modal('hide');
          
          if (component.$("#log-in-error-alert")[0]) {
            component.$("#log-in-error-alert")[0].remove();
          }
          
          component.get('notify').success("Welcome back" + user.fName + " " + user.lName + "!", {
            closeAfter: 3000,
            radius: true
          });
        }).error(function(/* jqXHW, textStatus, err */) {
          if (!component.$("#log-in-error-alert")[0]) {
            component.$("form").prepend('<div id="log-in-error-alert" class="alert alert-danger alert-dismissable fade in form-margin"><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button><span id="log-in-error-alert-text">Incorrect Email or Password</span></div>');
          }
          else {
            let alertTextSpan = component.$("#log-in-error-alert-text")[0];
            
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
