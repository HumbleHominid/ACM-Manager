import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  _notify: service('notify'),
  _session: service('session'),
  _currentUser: service('currentUser'),
  _events: service('events'),
  _announcements: service('announcements'),
    
  _loginWithToken: function(jwt) {
    "use strict";
    
    this.get('_session').authenticate('authenticator:auth', {
      jwt: jwt,
      task: 'UPDATE_TOKEN'
    }).then(() => {
      this._welcomeBackMessage();
    }).catch((/* reason */) => {
      this._invalidSessionMessage();
      
      let store = this.get('_session.store');
      
      store.clear().then(() => {
        store.persist(null);
      });
    });
  },
  _welcomeBackMessage: function() {
    "use strict";
    
    this.get('_notify').success(`Welcome back ${this.get('_currentUser.name')}!`, {
      closeAfter: 3 * 1000,
      radius: true
    });
  },
  _byeMessage: function() {
    "use strict";
    
    this.get('_notify').warning("Bye!", {
      closeAfter: 3 * 1000,
      radius: true
    });
  },
  _invalidSessionMessage: function() {
    "use strict";
    
    this.get('_notify').warning("Session has been invalidated. Please log in again.", {
      closeAfter: 3 * 1000,
      radius: true
    });
  },
  init() {
    "use strict";
    
    this._super(...arguments);
    
    let session = this.get('_session');
    let store = session.get('store');
    
    if (store) {
      store.restore().then((data) => {
        if (Ember.isPresent(data.jwt)) {
          this._loginWithToken(data.jwt);
        }
      }).catch(() => {
        this._invalidSessionMessage();
      }).finally(() => {
        this.get('_events').load();
        this.get('_announcements').load();
      });
    }
  },
  _updateData() {
    "use strict";
    
    this.get('_events').load();
    this.get('_announcements').load();
  },
  actions: {
    login() {
      "use strict";
      
      this._updateData();
      
      let session = this.get('_session');
      let user = session.get('data.authenticated');

      session.get('store').persist(user);
      
      this._welcomeBackMessage();
    },
    logout() {
      "use strict";
      
      let session = this.get('_session');
      let store = session.get('store');
      
      session.invalidate().then(() => {
        store.clear().then(() => {
          store.persist(null);
        });
      });
      
      this._updateData();
      this._byeMessage();
    }
  }
});
