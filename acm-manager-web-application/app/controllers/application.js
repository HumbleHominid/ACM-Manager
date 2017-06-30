import Ember from 'ember';

export default Ember.Controller.extend({
  cookies: Ember.inject.service(),
  user: {  },
  actions: {
    login(user) {
      this.set('user', user);

      this.get('cookies').write('jwt', user.jwt, {
        secure: true
      });
        
      this.get('cookies').write('userID', user.userID, {
        secure: true
      });
         
      this.get('cookies').write('rememberMe', user.rememberMe, {
        secure: true
      });
    },
    logout() {
      this.set('user', null);

      Object.keys(this.get('cookies').read()).forEach(function(key) {
        this.get('cookies').clear(key);
      }, this);
    }
  }
});
