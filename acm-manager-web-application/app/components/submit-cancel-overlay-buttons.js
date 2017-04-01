import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    onCancelButtonPress() {
      this.get('cancelCallback') ();
    },
    onSubmitButtonPress() {
      this.get('submitCallback') ();
    }
  }
});
