import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['darken-container'],
  classNameBindings: ['isOverlayActive:darken-container__darken'],

  click() {
    if (this.get('isOverlayActive')) {
      this.sendAction('brightenBackground');
    }
  }
});
