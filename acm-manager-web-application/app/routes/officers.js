import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  currentUser: service(),
  officers: service(),
  metadata: service(),
  
  init() {
    this._super(...arguments);
    
    let officers = this.get('officers');
    
    if (!officers.get('data')) {
      officers.load();
    }
    else {
      return;
    }
  }
});
