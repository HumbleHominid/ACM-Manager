import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  _notify: service('notify'),
  _metadata: service('metadata'),
  
  modalPrefix: 'create-account',
  
  didRender() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    
    $(`#${modalPrefix}-modal`).on('shown.bs.modal', () => {
      $(`#${modalPrefix}-first`).focus();
    }).on('hidden.bs.modal', () => {
      $(`#${modalPrefix}-form`)[0].reset();
    });
  },
  _getFormData() {
    "use strict";
      
    let modalPrefix = this.get('modalPrefix');
    let data = {  };

    data.first = $(`#${modalPrefix}-first`)[0].value;
    data.last = $(`#${modalPrefix}-last`)[0].value;
    data.username = $(`#${modalPrefix}-email`)[0].value;
    data.password = $(`#${modalPrefix}-password`)[0].value;

    let sameEmail = data.username === $(`#${modalPrefix}-confirm-email`)[0].value;
    let samePass = data.password === $(`#${modalPrefix}-confirm-password`)[0].value;

    if (!samePass || !sameEmail) {
      if (!$(`#${modalPrefix}-error-alert`)[0]) {
        $(`#${modalPrefix}-form`).prepend('<div id="${modalPrefix}-error-alert" class="alert alert-danger alert-dismissable fade in"><button type="button" class="close" data-dismiss="alert" aria-label="close"><span aria-hidden="true">&times;</span></button><span id="${modalPrefix}-error-alert-text">Emails or Passwords do not match</span></div>');
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
      
      return null;
    }
    
    return data;
  },
  actions: {
    createAccount() {
      "use strict";
      
      let modalPrefix = this.get('modalPrefix');
      let data = this._getFormData();
      
      if (Ember.isNone(data)) {
        return false;
      }
      
      (function(component) {
        let metadata = component.get('_metadata');
        
        $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: `${metadata.get('endPoint')}${metadata.get('namespace')}login`,
          data: JSON.stringify({
            task: "CREATE_ACCOUNT",
            data: data
          })
        }).done(function(data) {
          if (Ember.isPresent(data.reason)) {
            component.get('_notify').alert(`${data.reason}`, {
              radius: true,
              closeAfter: 3 * 1000
            });
            
            return false;
          }
          
          $(`#${modalPrefix}-modal`).modal('hide');
          
          let alert = $(`#${modalPrefix}-error-alert`)[0];
          
          if (alert) {
            alert.remove();
          }
          
          component.get('_notify').success("Account created! You can now log in!", {
            radius: true,
            closeAfter: 3 * 1000
          });
        }).fail(function() {
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
