import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    console.log(this.get('router.url').split('/')[1]);
    return {
      user: {
        type: 0,
        fName: 'Michael',
        lName: 'Fryer'
      },
      routeName: this.get('router.url').split('/')[1]
    };
  },
  afterModel() {
    console.log(this.get('router.url').split('/')[1]);
  },
  actions: {
    renderLogIn() {
      console.log('babab');
      this.render('log-in-overlay', {
        into: 'application',
        outlet: 'logInOverlay'
      });
    }
  }
});
