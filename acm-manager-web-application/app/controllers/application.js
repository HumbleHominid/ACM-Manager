import Ember from 'ember';

export default Ember.Controller.extend({
  cookies: Ember.inject.service(),
  notify: Ember.inject.service(),
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  events: { },
  user: { },
  
  loginWithToken(jwt) {
    (function(controller) {
      controller.get('session').authenticate('authenticator:auth', {
        task: "UPDATE_TOKEN",
        jwt: jwt
      }).catch(function(/* reason */) {
        controller.clearCookies();
        
        controller.invalidSessionMessage();
      }).then(function() {
        let user = controller.get('session.data.authenticated.user');

        controller.set('user', user);
        
        controller.setCookies({ jwt: user.jwt, rememberMe: true });
        
        controller.welcomeBackMessage();
      });
    }) (this);
  },
  getEvents: function() {
    let jwt = this.get('session.data.authenticated.user.jwt');
    let eventRequestObj = { task: "GET_LIST", token: jwt };
    
    eventRequestObj = JSON.stringify(eventRequestObj);
    
    (function(controller) {
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://katie.mtech.edu/~acmuser/backend/events',
        data: eventRequestObj
      }).done(function(data) {
        controller.set('events', Ember.copy(data.eventData, true));
      }).fail(function(/* jqXHW, textStatus, err */) {
        //fail
      });
    }) (this);
  },
  clearCookies: function() {
    this.get('cookies').clear('jwt');
       
    this.get('cookies').clear('rememberMe');
  },
  setCookies: function(params) {
    for (let cookie in params) {
      this.get('cookies').write(cookie, params[cookie].toString(), {
        secure: true
      });
    }//for
  },
  welcomeBackMessage() {
    this.get('notify').success("Welcome back " + this.get('user.fName') + " " + this.get('user.lName') + "!", {
      closeAfter: 3000,
      radius: true
    });
  },
  byeMessage() {
    this.get('notify').warning("Bye!", {
      closeAfter: 3000,
      radius: true
    });
  },
  invalidSessionMessage() {
    this.get('notify').warning("Session has been invalidated. Please log in again.", {
      closeAfter: 3000,
      radius: true
    });
  },
  init() {
    this._super(...arguments);

    let jwt = this.get('cookies').read('jwt');

    if (jwt) {
      this.loginWithToken(jwt);
    }

    this.getEvents();

    Ember.$(window).on('beforeunload', () => {
      if (this.get('cookies').read('rememberMe') !== "true") {
        this.clearCookies();
      }
    });
  },
  actions: {
    login() {
      let user = this.get('session.data.authenticated.user');

      this.set('user', user);

      this.setCookies({ jwt: user.jwt, rememberMe: user.rememberMe });

      this.getEvents();
      
      this.welcomeBackMessage();
    },
    logout() {
      this.set('user', null);
      
      this.clearCookies();
      
      this.getEvents();

      this.byeMessage();
    },
    invalidateSession: function() {
      this.get('session').invalidate();
    },
    updateJWT(jwt) {
      this.set('user.jwt', jwt);

      this.get('cookies').write('jwt', jwt, {
        secure: "secure"
      });
    }
  }
});
