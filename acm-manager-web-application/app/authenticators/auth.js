import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const { inject: { service } } = Ember;

export default BaseAuthenticator.extend({
  session: service(),
  metadata: service(),

  authenticate(options) {
    "use strict";
    
    let auth = this;
    
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
            auth.get('session').set('user', response.user);
            
            resolve({ jwt: response.user.jwt });
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
console.log(data)
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
