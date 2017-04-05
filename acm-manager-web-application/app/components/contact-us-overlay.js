import AbstractOverlay from './abstract-overlay';

export default AbstractOverlay.extend({
  classNames: ['submit-cancel-buttons'],
  
  actions: {
    onCancelButtonPress() {
      this.get('cancelCallback') ();
    },
    onSubmitButtonPress() {
      this.get('submitCallback') ();
    }
  }
});