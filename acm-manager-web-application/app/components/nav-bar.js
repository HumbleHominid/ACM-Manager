import Ember from 'ember';

export default Ember.Component.extend({
  displayLogIn: false,
  loggedIn: false,
  user: {
    type: 0,
    fName: 'Michael',
    lName: 'Fryer'
  },
  actions: {
    showLogIn() {
      this.set('displayLogIn', true);
      this.set('loggedIn', true);
      this.set('user.type', 2);
    },
    hideLogIn() {
      this.set('displayLogIn', false);
    }
  }
});
