import Ember from 'ember';

export default Ember.Service.extend({
  data: null,
  
  past: Ember.computed('data', function() {
    let data = this.get('data');
    
    return (data ? data.eventData.past : null);
  }),
  future: Ember.computed('data', function() {
    let data = this.get('data');
    
    return (data ? data.eventData.future : null);
  }),
  init() {
    this._super(...arguments);
    
    this.set('data', null);
  },
  load(data) {
    this.set('data', data);
  },
  empty() {
    this.get('data').clear();
  },
  read() {
    return this.get('data');
  }
});
