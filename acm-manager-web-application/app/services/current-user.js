import Ember from 'ember';

export default Ember.Service.extend({
  data: null,
  
  id: Ember.computed('data', function() {
    let user = this.get('data');
    
    return (user ? user.user_id : -1);
  }),
  name: Ember.computed('data', function() {
    let user = this.get('data');
    
    return (user ? user.fName + " " + user.lName : "");
  }),
  token: Ember.computed('data', function() {
    let user = this.get('data');
    
    return (user ? user.jwt : "");
  }),
  userType: Ember.computed('data', function() {
    let user = this.get('data');
    
    return (user ? user.user_type : "");
  }),
  init() {
    this._super(...arguments);
    
    this.set('data', null);
  },
  load(user) {
    this.set('data', user);
  },
  clear() {
    this.set('data', null);
  },
  read() {
    return this.get('data');
  }
});
