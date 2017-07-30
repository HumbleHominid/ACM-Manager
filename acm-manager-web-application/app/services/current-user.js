import Ember from 'ember';

export default Ember.Service.extend({
  _data: null,
  
  id: Ember.computed('_data', function() {
    let user = this.get('_data');
    
    return (user ? user.user_id : -1);
  }),
  name: Ember.computed('_data', function() {
    let user = this.get('_data');
    
    return (user ? user.fName + " " + user.lName : "");
  }),
  token: Ember.computed('_data', function() {
    let user = this.get('_data');
    
    return (user ? user.jwt : "");
  }),
  userType: Ember.computed('_data', function() {
    let user = this.get('_data');
    
    return (user ? user.user_type : "");
  }),
  init() {
    this._super(...arguments);
    
    this.set('_data', null);
  },
  load(user) {
    this.set('_data', user);
  },
  clear() {
    this.set('_data', null);
  },
  read() {
    return this.get('_data');
  }
});
