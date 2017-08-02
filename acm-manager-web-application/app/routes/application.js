import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  sessionInvalidated() {
    "use strict";
    
    this.transitionTo('home');
  }
});
