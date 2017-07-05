import Ember from 'ember';

export default Ember.Controller.extend({
  cookies: Ember.inject.service(),
  notify: Ember.inject.service(),
  
  user: { },
  events: { },
  
  loginWithToken(jwt) {
    let tokenRequestObj = { task: "UPDATE_TOKEN", token: jwt };
    
    tokenRequestObj = JSON.stringify(tokenRequestObj);
    
    (function(controller) {
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://katie.mtech.edu/~acmuser/backend/login',
        data: tokenRequestObj
      }).done(function(data) {
        controller.set('user', data.user);
        
        controller.setCookies(data.user.jwt, true);
        
        controller.welcomeBackMessage();
      }).fail(function(/* jqXHW, textStatus, err */) {
        controller.clearCookies();
        
        controller.invalidSessionMessage();
      });
    }) (this);
  },
  
  getEvents: function() {
    let jwt = this.get('cookies').read('jwt');
    let eventRequestObj = { task: "GET_LIST" };
    
    if (jwt) {
      eventRequestObj.token = jwt;
    }
    
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
  setCookies: function(jwt, rememberMe) {
    this.get('cookies').write('jwt', jwt, {
      domain: true,
      secure: "secure"
    });
       
    this.get('cookies').write('rememberMe', (rememberMe ? "true" : "false"), {
      domain: true,
      secure: "secure"
    });
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
  },
  actions: {
    login(user) {
      this.set('user', user);
      
      this.setCookies(user.jwt, user.rememberMe);
      
      this.welcomeBackMessage();
    },
    logout() {
      this.set('user', null);
      
      this.clearCookies();
      
      this.getEvents();
    },
    updateJWT(jwt) {
      this.set('user.jwt', jwt);

      this.get('cookies').write('jwt', jwt, {
        secure: "secure"
      });
    }
  }
});
