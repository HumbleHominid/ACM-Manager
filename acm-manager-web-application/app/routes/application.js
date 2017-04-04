import Ember from 'ember';

export default Ember.Route.extend({
  overlayActive: true,

  model() {
    return { routeName: this.get('router.url').split('/')[1] };
  },
  actions: {
    haha() {
      //document.getElementById('page-container').className = 'page-container__darken';

      console.log(this.get('overlayActive'));
    },
    setOverlayActive() {
      if (!overlayActive) {
        document.getElementById('page-container').className = 'page-container__darken';

        this.set('overlayActive', true);
      }
    },
    setOverlayInactive() {
      if (overlayActive) {
        document.getElementById('page-container').className = 'page-container';

        this.set('overlayActive', true);
      }
    }
  }
});