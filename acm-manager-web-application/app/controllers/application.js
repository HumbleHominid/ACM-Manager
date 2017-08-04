import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  notify: service(),
  session: service(),
  currentUser: service(),
  events: service(),
  announcements: service(),
    
  _loginWithToken: function(jwt) {
    "use strict";
    
    (function(controller) {
      controller.get('session').authenticate('authenticator:auth', {
        task: "UPDATE_TOKEN",
        jwt: jwt.toString()
      }).then(function() {
        controller.send('login');
      }).catch(function(/* reason */) {
        controller._invalidSessionMessage();
      });
    }) (this);
  },
  _welcomeBackMessage: function() {
    "use strict";
    
    this.get('notify').success(`Welcome back ${this.get('currentUser.name')}!`, {
      closeAfter: 3000,
      radius: true
    });
  },
  _byeMessage: function() {
    "use strict";
    
    this.get('notify').warning("Bye!", {
      closeAfter: 3000,
      radius: true
    });
  },
  _invalidSessionMessage: function() {
    "use strict";
    
    this.get('notify').warning("Session has been invalidated. Please log in again.", {
      closeAfter: 3000,
      radius: true
    });
  },
  init() {
    "use strict";
    
    this._super(...arguments);
    
    let session = this.get('session');
    let store = session.get('store');
    
    if (store) {
      store.restore().catch(() => {
        this._invalidSessionMessage();
      }).finally(() => {
        this.get('events').load();
        this.get('announcements').load();
      });
    }
  },
  _updateData() {
    "use strict";
    
    this.get('events').load();
    this.get('announcements').load();
  },
  actions: {
    login() {
      "use strict";
      
      this._updateData();
      
      let session = this.get('session');console.log(session)
      let user = session.get('user');
      let jwt = session.get('data.authenticated.jwt');

      session.get('store').persist({ jwt: jwt, user: user });
      
      this._welcomeBackMessage();
    },
    logout() {
      "use strict";
      
      let session = this.get('session');
      
      session.invalidate().then(() => {
        session.get('store').clear();
      });
      
      this._updateData();
      this._byeMessage();
    }
  }
});
