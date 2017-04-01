import AbstractOverlay from './abstract-overlay';

export default AbstractOverlay.extend({
  actions: {
    onCreateAccountButtonPress() {
      this.get('creatrAccountCallback')();
    }
  }
});
