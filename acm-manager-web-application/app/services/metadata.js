import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  events: service(),
  officers: service(),
  
  endPoint: null,
  
  init() {
    this._super(...arguments);
    
    this.set('endPoint', null);
  }
});
