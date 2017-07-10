import Ember from 'ember';
import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default OAuth2PasswordGrantAuthenticator.extend({
  session: Ember.inject.service(),

  restore: function(data) {
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
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://katie.mtech.edu/~acmuser/backend/login',
        data: JSON.stringify({
          task: options.task,
          token: options.jwt,
          data: {
            username: options.username,
            password: options.password
          }
        })
      }).done((response) => {
        Ember.run(() => {
          resolve({ user: response.user });
        });
      }).fail((xhr/* , status, error */) => {
        var response = xhr.responseText;

        Ember.run(() => {
          reject(response);
        });
      });
    });
  },
  invalidate(/* data */) {
    return Ember.RSVP.resolve();
  }
});
