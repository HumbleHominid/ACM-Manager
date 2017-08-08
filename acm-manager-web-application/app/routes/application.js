import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),
  
  sessionInvalidated() {
    "use strict";
    
    let store = this.get('session.store');
    
    store.clear().then(() => {
      store.persist(null);
    });
    
    this._super(...arguments);
  }
});
