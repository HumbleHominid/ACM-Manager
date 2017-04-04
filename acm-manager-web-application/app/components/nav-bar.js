import Ember from 'ember';

export default Ember.Component.extend({
  displayLogIn: false,
  displayContactUs: false,
  displayAddUser: false,
  displayRemoveUser: false,
  displayCreateAccount: false,

  loggedIn: false,
  user: {
    type: 2,
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
      this.send('hideOverlays');

      this.set('displayLogIn', true);
    },
    hideLogIn() {
      this.set('displayLogIn', false);
    },
    showContactUs() {
      this.send('hideOverlays');

      this.set('displayContactUs', true);
    },
    hideContactUs() {
      this.set('displayContactUs', false);
    },
    showAddUser() {
      this.send('hideOverlays');

      this.set('displayAddUser', true);
    },
    hideAddUser() {
      this.send('hideOverlays');

      this.set('displayAddUser', false);
    },
    showRemoveUser() {
      this.set('displayRemoveUser', true);
    },
    hideRemoveUser() {
      this.set('displayRemoveUser', false);
    },
    showCreateAccount() {
      this.send('hideOverlays');

      this.set('displayCreateAccount', true);
    },
    hideCreateAccount() {
      this.set('displayCreateAccount', false);
    },
    hideOverlays() {
      this.set('displayCreateAccount', false);
      this.set('displayRemoveUser', false);
      this.set('displayLogIn', false);
      this.set('displayContactUs', false);
      this.set('displayAddUser', false);

      this.sendAction('darkenBackground');
    }
  }
});
