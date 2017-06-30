import Ember from 'ember';

export default Ember.Component.extend({
  smallScreen: false,
  
  didRender() {
    this.set('smallScreen', parseInt(Ember.$(window).width()) < 1225);
  }
});
