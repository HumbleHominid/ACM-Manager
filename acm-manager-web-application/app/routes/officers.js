import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  currentUser: service(),
  officers: service(),
  
  activate() {
    this.get('officers').load();
  }
});
