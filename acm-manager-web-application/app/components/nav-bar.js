import Ember from 'ember';

export default Ember.Component.extend({
  displayLogIn: false,
  displayContactUs: false,
  displayAddUser: false,
  displayRemoveUser: false,
  loggedIn: true,
  user: {
    type: 2,
    fName: 'Michael',
    lName: 'Fryer'
  },
  actions: {
    showLogIn() {
      this.set('displayLogIn', true);
    },
    hideLogIn() {
      this.set('displayLogIn', false);
    },
    showContactUs() {
      this.set('displayContactUs', true);
    },
    hideContactUs() {
      this.set('displayContactUs', false);
    },
    showAddUser() {
      this.set('displayAddUser', true);
    },
    hideAddUser() {
      this.set('displayAddUser', false);
    },
    showRemoveUser() {
      this.set('displayRemoveUser', true);
    },
    hideRemoveUser() {
      this.set('displayRemoveUser', false);
    }
  }
});
