import Ember from 'ember';

export default Ember.Component.extend({
  errorMessage: "",
  
  actions: {
    onCreateAccountButtonPress() {
      this.get('createAccountCallback') ();
    },
    authenticate() {
      let user = { };
      
      user.username = this.$('#log-in-email')[0].value;
      user.password = this.$('#log-in-password')[0].value;

      user = JSON.stringify(user);

      (function(component) {
        Ember.$.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: 'https://katie.mtech.edu/~acmuser/backend/login',
          data: user
        }).done(function(data) {
          component.get('submitCallback') (data.user);
          component.$("#log-in-modal").modal('hide');
        }).fail(function() {
          if (!component.$("#log-in-alert-text")[0]) {
            component.$("form").prepend('<div class="alert alert-danger alert-dismissable fade in form-margin"><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button><span id="log-in-alert-text">Incorrect Email or Password</span></div>');
          }
          else {
            let alertTextSpan = component.$("#log-in-alert-text")[0];
            
            if (alertTextSpan.innerHTML.indexOf("again") !== -1) {
              alertTextSpan.innerHTML = alertTextSpan.innerHTML + ", and again";
            }
            else {
              alertTextSpan.innerHTML = alertTextSpan.innerHTML + " again";
            }
          }
        });
      })(this);
      
      return false;
    }
  }
});
