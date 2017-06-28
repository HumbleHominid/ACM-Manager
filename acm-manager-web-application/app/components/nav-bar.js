import Ember from 'ember';

export default Ember.Component.extend({
  smallScreen: false,
  
  init() {
    this._super(...arguments);

    if (Ember.$(document).width() <= 800) {
      this.set('smallScreen', true);
    }
  }
});
