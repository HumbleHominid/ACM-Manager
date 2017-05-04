import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
