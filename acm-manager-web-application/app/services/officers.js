import Ember from 'ember';

export default Ember.Service.extend({
  data: null,
  
  init() {
    this._super(...arguments);
    
    this.set('data', null);
  },
  president: Ember.computed('data', function() {
    let data = this.get('data');
    
    if (data) {
      return data.president;
    }
  }),
  vicePresident: Ember.computed('data', function() {
    let data = this.get('data');
    
    if (data) {
      return data.vicePresident;
    }
  }),
  secretary: Ember.computed('data', function() {
    let data = this.get('data');
    
    if (data) {
      return data.secretary;
    }
  }),
  treasurer: Ember.computed('data', function() {
    let data = this.get('data');
    
    if (data) {
      return data.treasurer;
    }
  }),
  load(data) {
    this.set('data', data);
  },
  read() {
    return this.get('data');
  },
  clear() {
    this.set('data', null);
  }
});
