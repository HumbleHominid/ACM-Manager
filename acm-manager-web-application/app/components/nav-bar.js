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
    showContactUs() {
      this.send('hideOverlays');

      this.set('displayContactUs', true);
    },
    showAddUser() {
      this.send('hideOverlays');

      this.set('displayAddUser', true);
    },
    showRemoveUser() {
      this.send('hideOverlays');

      this.set('displayRemoveUser', true);
    },
    showCreateAccount() {
      this.send('hideOverlays');

      this.set('displayCreateAccount', true);
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
