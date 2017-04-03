import Ember from 'ember';

export default Ember.Component.extend({
  displayLogIn: false,
  displayContactUs: false,
  displayAddUser: false,
  displayRemoveUser: false,
  displayCreateAccount: false,

  loggedIn: false,
  user: {
    type: 0,
    fName: 'Michael',
    lName: 'Fryer'
  },
  formData: {
    email: null,
    confirm_email: null,
    password: null,
    confirm_password: null
  },
  actions: {
    showLogIn() {
      this.set('displayLogIn', true);
      this.set('displayContactUs', false);
      this.set('displayAddUser', false);
      this.set('displayRemoveUser', false);
      this.set('displayCreateAccount', false);
    },
    hideLogIn() {
      this.set('displayLogIn', false);
    },
    showContactUs() {
      this.set('displayContactUs', true);
      this.set('displayLogIn', false);
      this.set('displayAddUser', false);
      this.set('displayRemoveUser', false);
      this.set('displayCreateAccount', false);
    },
    hideContactUs() {
      this.set('displayContactUs', false);
    },
    showAddUser() {
      this.set('displayAddUser', true);
      this.set('displayLogIn', false);
      this.set('displayContactUs', false);
      this.set('displayRemoveUser', false);
      this.set('displayCreateAccount', false);
    },
    hideAddUser() {
      this.set('displayAddUser', false);
    },
    showRemoveUser() {
      this.set('displayRemoveUser', true);
      this.set('displayLogIn', false);
      this.set('displayContactUs', false);
      this.set('displayAddUser', false);
      this.set('displayCreateAccount', false);
    },
    hideRemoveUser() {
      this.set('displayRemoveUser', false);
    },
    showCreateAccount() {
      this.set('displayCreateAccount', true);
      this.set('displayRemoveUser', false);
      this.set('displayLogIn', false);
      this.set('displayContactUs', false);
      this.set('displayAddUser', false);
    },
    hideCreateAccount() {
      this.set('displayCreateAccount', false);
    }
  }
});
