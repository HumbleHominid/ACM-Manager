import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  _notify: service('notify'),
  
  modalPrefix: 'create-account',
  
  didRender() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    let modal = $(`#${modalPrefix}-modal`);
    
    modal.on('shown.bs.modal', () => {
      $(`#${modalPrefix}-first`).focus();
    });
    
    modal.on('hidden.bs.modal', () => {
      $(`#${modalPrefix}-form`)[0].reset();
    });
  },
  actions: {
    createAccount() {
      "use strict";
      
      let modalPrefix = this.get('modalPrefix');
      let obj = { data: { } };

      obj.task = "CREATE_ACCOUNT";
      obj.data.first = $(`#${modalPrefix}-first`)[0].value;
      obj.data.last = $(`#${modalPrefix}-last`)[0].value;
      obj.data.username = $(`#${modalPrefix}-email`)[0].value;
      obj.data.password = $(`#${modalPrefix}-password`)[0].value;

      let sameEmail = obj.data.username === $(`#${modalPrefix}-confirm-email`)[0].value;
      let samePass = obj.data.password === $(`#${modalPrefix}-confirm-password`)[0].value;

      if (!samePass || !sameEmail) {
        if (!$(`#${modalPrefix}-error-alert`)[0]) {
          $(`#${modalPrefix}-form`).prepend('<div id="create-account-error-alert" class="alert alert-danger alert-dismissable fade in"><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button><span id="create-account-error-alert-text">Emails or Passwords do not match</span></div>');
        }
        else {
          let alertTextSpan = $(`#${modalPrefix}-error-alert-text`)[0];
          
          if (alertTextSpan.innerHTML.indexOf("again") !== -1) {
            alertTextSpan.innerHTML = alertTextSpan.innerHTML + ", and again";
          }
          else {
            alertTextSpan.innerHTML = alertTextSpan.innerHTML + " again";
          }
        }
        
        return false;
      }

      obj = JSON.stringify(obj);

      (function(component) {
        Ember.$.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: `${component.get('metadata.endPoint')}login`,
          data: obj
        }).done(function() {
          $(`#${modalPrefix}-modal`).modal('hide');
          
          let alert = $(`#${modalPrefix}-error-alert`)[0];
          
          if (alert) {
            alert.remove();
          }
          
          component.get('_notify').success("Account created! You can now log in!", {
            closeAfter: 3 * 1000,
            radius: true
          });
        }).fail(function(/* jqXHW, textStatus, err */) {
          let alert = $(`#${modalPrefix}-error-alert`)[0];
          
          if (alert) {
            alert.remove();
          }
          
          component.get('_notify').alert("Failed to create an account.", {
            radius: true,
            closeAfter: 3 * 1000
          });
        });
      }) (this);
      
      return false;
    }
  }
});
