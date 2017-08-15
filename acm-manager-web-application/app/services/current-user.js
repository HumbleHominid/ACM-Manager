import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  _session: service('session'),
  
  id: Ember.computed('_session.data.authenticated', function() {
    "use strict";
    
    let user = this.get('_session.data.authenticated');
    
    return (user ? user.user_id : -1);
  }),
  name: Ember.computed('_session.data.authenticated', function() {
    "use strict";
    
    let user = this.get('_session.data.authenticated');
    
    return (user ? `${user.fName} ${user.lName}` : "");
  }),
  token: Ember.computed('_session.data.authenticated', function() {
    "use strict";
    
    let user = this.get('_session.data.authenticated');
    
    return (user ? user.jwt : "");
  }),
  userType: Ember.computed('_session.data.authenticated', function() {
    "use strict";
    
    let user = this.get('_session.data.authenticated');
    
    return (user ? user.user_type : "");
  }),
  data: Ember.computed('_session.data.authenticated', function() {
    "use strict";
    
    let user = this.get('_session.data.authenticated');
    
    return (user ? user : null);
  })
});
