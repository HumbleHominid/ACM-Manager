import Ember from 'ember';

export default Ember.Component.extend({
  isOverlayActive: false,

  actions: {
    setOverlayActive() {
      if (!this.get('isOverlayActive')) {
        this.set('isOverlayActive', true);
      }
    },
    setOverlayInactive() {
      if (this.get('isOverlayActive')) {
        this.set('isOverlayActive', false);
      }
    }
  }
});
