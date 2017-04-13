import AbstractOverlay from './abstract-overlay';

export default AbstractOverlay.extend({
  actions: {
    onCreateAccountButtonPress() {
      this.get('createAccountCallback')();
    },
    onResetPasswordButtonPress() {
      this.get('resetPasswordCallback')();
    }
  }
});
