import Ember from 'ember';

export default Ember.Service.extend({
  _data: null,
  
  id: Ember.computed('_data', function() {
    "use strict";
    
    let user = this.get('_data');
    
    return (user ? user.user_id : -1);
  }),
  name: Ember.computed('_data', function() {
    "use strict";
    
    let user = this.get('_data');
    
    return (user ? `${user.fName} ${user.lName}` : "");
  }),
  token: Ember.computed('_data', function() {
    "use strict";
    
    let user = this.get('_data');
    
    return (user ? user.jwt : "");
  }),
  userType: Ember.computed('_data', function() {
    "use strict";
    
    let user = this.get('_data');
    
    return (user ? user.user_type : "");
  }),
  init() {
    "use strict";
    
    this._super(...arguments);
    
    this.set('_data', null);
  },
  load(user) {
    "use strict";
    
    this.set('_data', user);
  },
  clear() {
    "use strict";
    
    this.set('_data', null);
  },
  read() {
    "use strict";
    
    return this.get('_data');
  }
});
