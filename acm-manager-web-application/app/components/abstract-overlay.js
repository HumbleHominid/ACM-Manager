import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['post-overlay'],

  actions: {
    onCancelButtonPress() {
      this.sendAction('cancelCallback');
    },
    onSubmitButtonPress() {
      console.log('onSubmitButtonPress() needs to be implemented in subcomponent.');
    }
  }
});
