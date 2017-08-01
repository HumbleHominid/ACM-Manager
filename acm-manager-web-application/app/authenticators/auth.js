import Ember from 'ember';
import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';

const { inject: { service } } = Ember;

export default OAuth2PasswordGrantAuthenticator.extend({
  session: service(),
  metadata: service(),

  restore: function(data) {
    "use strict";
    
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      }
      else {
        reject();
      }
    });
  },
  authenticate: function(options) {
    "use strict";

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: `${this.get('metadata.endPoint')}login`,
        data: JSON.stringify({
          task: options.task,
          token: options.jwt,
          data: {
            username: options.username,
            password: options.password,
            rememberMe: options.rememberMe
          }
        })
      }).done((response) => {
        if (response.user) {
          
          Ember.run(() => {
            resolve({ user: response.user });
          });
        }
        else {
          reject();
        }
      }).fail((xhr/* , status, error */) => {
        var response = xhr.responseText;

        Ember.run(() => {
          reject(response);
        });
      });
    });
  },
  invalidate: function(/* data */) {
    "use strict";
    
    return Ember.RSVP.resolve();
  }
});
