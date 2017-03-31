import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      fName: 'Michael',
      lName: 'Fryer',
    };
  }
});
