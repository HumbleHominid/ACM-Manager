import Ember from 'ember';

export default Ember.Component.extend({
  displayLogIn: false,
  displayContactUs: false,
  displayAddUser: false,
  displayRemoveUser: false,
  displayCreateAccount: false,
  displayResetPassword: false,

  user: {
    fName: 'Poop',
    lName: 'Guy',
    email: '',
    userID: '',
    user_type: 0,
    jwt: null
  },
  actions: {
    logIn(params) {
      this.set('user', params);
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
