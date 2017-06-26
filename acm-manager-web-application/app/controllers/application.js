import Ember from 'ember';

export default Ember.Controller.extend({
  user: { },
  actions: {
    login(user) {
      this.set('user', user);
    },
    logout() {
      this.set('user', null);
    }
  }
});
