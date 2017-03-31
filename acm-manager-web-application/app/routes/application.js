import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      user: {
        type: 2,
        fName: 'Michael',
        lName: 'Fryer'
      },
      routeName: this.get('router.url').split('/')[1]
    };
  }
});
