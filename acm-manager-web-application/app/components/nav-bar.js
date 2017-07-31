import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  currentUser: service(),
  
  smallScreen: false,
  
  didRender() {
    "use strict";
    
    this.set('smallScreen', parseInt(Ember.$(window).width()) < 1225);
  }
});
