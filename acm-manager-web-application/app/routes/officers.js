import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  officers: service(),
  events: service(),
  
  activate() {
    this.get('officers').load();
    this.get('events').load();
  }
});
