import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),
  
  id: Ember.computed('session.user', function() {
    "use strict";
    
    let user = this.get('session.user');
    
    return (user ? user.user_id : -1);
  }),
  name: Ember.computed('session.user', function() {
    "use strict";
    
    let user = this.get('session.user');
    
    return (user ? `${user.fName} ${user.lName}` : "");
  }),
  token: Ember.computed('session.user', function() {
    "use strict";
    
    let user = this.get('session.user');
    
    return (user ? user.jwt : "");
  }),
  userType: Ember.computed('session.user', function() {
    "use strict";
    
    let user = this.get('session.user');
    
    return (user ? user.user_type : "");
  })
});
