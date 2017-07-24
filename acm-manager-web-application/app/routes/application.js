import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  metadata: Ember.inject.service(),
  
  init() {
    this._super(...arguments);
    
    this.get('metadata').set('endPoint', Ember.$(window)["0"].AcmManagerWebApplication.endPoint);
  }
});
