import Ember from 'ember';

export default Ember.Component.extend({
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
