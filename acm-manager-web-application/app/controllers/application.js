import Ember from 'ember';

export default Ember.Controller.extend({
  cookies: Ember.inject.service(),
  notify: Ember.inject.service(),
  
  user: { },
  events: { },
  
  loginWithToken(jwt) {
    if (!jwt) {
      return;
    }
    
    let tokenRequestObj = { task: "UPDATE_TOKEN", token: jwt };
    
    tokenRequestObj = JSON.stringify(tokenRequestObj);
    
    (function(controller) {
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://katie.mtech.edu/~acmuser/backend/login',
        data: tokenRequestObj
      }).done(function(data) {
        controller.send('login', data.user);
      }).fail(function(/* jqXHW, textStatus, err */) {
        //something failed
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
        //something failed
      });
    }) (this);
  },
  
  init() {
    this._super(...arguments);
    
    let jwt = this.get('cookies').read('jwt');

    this.loginWithToken(jwt);

    this.getEvents();
  },
  actions: {
    login(user) {
      this.set('user', user);

      this.get('cookies').write('jwt', user.jwt, {
        secure: true
      });
        
      this.get('cookies').write('user_id', user.user_id, {
        secure: true
      });
         
      this.get('cookies').write('rememberMe', user.rememberMe, {
        secure: true
      });
        
      this.get('notify').success("Welcome back " + user.fName + " " + user.lName + "!", {
        closeAfter: 3000,
        radius: true
      });
    },
    logout() {
      this.set('user', null);

      Object.keys(this.get('cookies').read()).forEach(function(key) {
        this.get('cookies').clear(key);
      }, this);
      
      this.getEvents();
      
      this.get('notify').warning("Bye!", {
        closeAfter: 3000,
        radius: true
      });
    },
    updateJWT(jwt) {
      this.set('user.jwt', jwt);

      this.get('cookies').write('jwt', jwt, {
        secure: true
      });
    }
  }
});
