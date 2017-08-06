import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const { inject: { service } } = Ember;

export default BaseAuthenticator.extend({
  _metadata: service('metadata'),

  authenticate(options) {
    "use strict";
    
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: `${this.get('_metadata.endPoint')}login`,
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
          if (options.jwt) {
            response.user.jwt = options.jwt;
          }
          
          resolve(response.user);
        }
        else {
          reject();
        }
      }).fail((xhr/* , status, error */) => {
        var response = xhr.responseText;

        reject(response);
      });
    });
  },
  restore(data) {
    "use strict";

    let auth = this;
    
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.jwt)) {
        auth.get('session').set('user', data.user ? data.user : null);
        
        resolve({ jwt: data.jwt });
      }
      else {
        reject();
      }
    });
  }
});
