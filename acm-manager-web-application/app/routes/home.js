import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  events: service(),
  
  activate() {
    "use strict";
    
    this.get('events').load();
  }
});
