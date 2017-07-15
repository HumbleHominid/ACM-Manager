import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  notify: service(),
  session: service(),
  currentUser: service(),
  events: service(),
  
  loginWithToken: function(jwt) {
    (function(controller) {
      controller.get('session').authenticate('authenticator:auth', {
        task: "UPDATE_TOKEN",
        jwt: jwt
      }).then(function() {
        controller.send('login');
      }).catch(function(/* reason */) {
        controller.get('session.store').clear();
        
        controller.invalidSessionMessage();
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
        let eventData = Ember.copy(data, true);
        
        controller.get('events').load(eventData);
      }).fail(function(/* jqXHW, textStatus, err */) {
        //fail
      });
    }) (this);
  },
  welcomeBackMessage: function() {
    this.get('notify').success("Welcome back " + this.get('currentUser.name') + "!", {
      closeAfter: 3000,
      radius: true
    });
  },
  byeMessage: function() {
    this.get('notify').warning("Bye!", {
      closeAfter: 3000,
      radius: true
    });
  },
  invalidSessionMessage: function() {
    this.get('notify').warning("Session has been invalidated. Please log in again.", {
      closeAfter: 3000,
      radius: true
    });
  },
  init() {
    this._super(...arguments);
    
    if (this.get('session.store')) {
      this.get('session.store').restore().then((user) => {
        if (user.jwt) {
          this.loginWithToken(user.jwt);
        }
      }).catch(() => {
        this.get('session.store').clear();
        
        this.invalidSessionMessage();
      }).finally(() => {
        this.getEvents();
      });
    }
  },
  actions: {
    login() {
      let user = this.get('session.data.authenticated.user');
      
      this.get('session.store').persist(user);
      
      this.get('currentUser').load(user);

      this.getEvents();
      this.welcomeBackMessage();
    },
    logout() {
      this.get('session.store').clear();
      
      this.get('currentUser').clear();
      
      this.getEvents();
      this.byeMessage();
    },
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});
