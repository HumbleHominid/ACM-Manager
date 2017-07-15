import Ember from 'ember';

export default Ember.Service.extend({
  user: null,
  
  id: Ember.computed('user', function() {
    let user = this.get('user');
    
    return (user ? user.user_id : -1);
  }),
  name: Ember.computed('user', function() {
    let user = this.get('user');
    
    return (user ? user.fName + " " + user.lName : "");
  }),
  token: Ember.computed('user', function() {
    let user = this.get('user');
    
    return (user ? user.jwt : "");
  }),
  email: Ember.computed('user', function() {
    let user = this.get('user');
    
    return (user ? user.email : "");
  }),
  userType: Ember.computed('user', function() {
    let user = this.get('user');
    
    return (user ? user.user_type : "");
  }),
  init() {
    this._super(...arguments);
    
    this.set('user', { });
  },
  load(user) {
    this.set('user', user);
  },
  clear() {
    this.get('user').clear();
  },
  read() {
    return this.get('user');
  }
});
