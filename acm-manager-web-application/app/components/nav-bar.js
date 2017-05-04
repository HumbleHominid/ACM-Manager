import Ember from 'ember';

export default Ember.Component.extend({
  displayLogIn: false,
  displayContactUs: false,
  displayAddUser: false,
  displayRemoveUser: false,
  displayCreateAccount: false,
  displayResetPassword: false,

  user: {
    fName: '',
    lName: '',
    email: '',
    userID: '',
    user_type: 0,
    jwt: null
  },
  actions: {
    showLogIn() {
      this.send('hideOverlays');

      this.set('displayLogIn', true);

      this.sendAction('darkenBackground');
    },
    showContactUs() {
      this.send('hideOverlays');

      this.set('displayContactUs', true);

      this.sendAction('darkenBackground');
    },
    showAddUser() {
      this.send('hideOverlays');

      this.set('displayAddUser', true);

      this.sendAction('darkenBackground');
    },
    showRemoveUser() {
      this.send('hideOverlays');

      this.set('displayRemoveUser', true);

      this.sendAction('darkenBackground');
    },
    showCreateAccount() {
      this.send('hideOverlays');

      this.set('displayCreateAccount', true);

      this.sendAction('darkenBackground');
    },
    showResetPassword() {
      this.send('hideOverlays');

      this.set('displayResetPassword', true);

      this.sendAction('darkenBackground');
    },
    hideOverlays() {
      this.set('displayCreateAccount', false);
      this.set('displayRemoveUser', false);
      this.set('displayLogIn', false);
      this.set('displayContactUs', false);
      this.set('displayAddUser', false);
      this.set('displayResetPassword', false);
    },
    closeOverlay() {
      this.send('hideOverlays');

      this.sendAction('brightenBackground');
    },
    logIn(params) {
      this.set('user', params);

      this.send('closeOverlay');
    },
    logOut() {
      let user = {
                  fName: '',
                  lName: '',
                  email: '',
                  userID: '',
                  user_type: 0,
                  jwt: null
                };

      this.set('user', user);
    }
  }
});
