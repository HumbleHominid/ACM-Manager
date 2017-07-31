import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    "use strict";
    
    this.replaceWith('home');
  }
});
