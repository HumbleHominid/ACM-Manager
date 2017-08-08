import Ember from 'ember';

const { $ } = Ember;

export default Ember.Service.extend({
  data: null,
  
  init() {
    "use strict";
    
    this._super(...arguments);
   
    let domWindow = $(window);
    
    if (domWindow["0"].AcmManagerWebApplication) {
      this.set('data', domWindow["0"].AcmManagerWebApplication.socialMedia);
    }
    else {
      this.set('data', null);
    }
  },
  discord: Ember.computed('data', function() {
    "use strict";
    
    let data = this.get('data');
    
    return (data ? data.discord : null);
  }),
  facebook: Ember.computed('data', function() {
    "use strict";
    
    let data = this.get('data');
    
    return (data ? data.facebook : null);
  }),
  instagram: Ember.computed('data', function() {
    "use strict";
    
    let data = this.get('data');
    
    return (data ? data.instagram : null);
  }),
  slack: Ember.computed('data', function() {
    "use strict";
    
    let data = this.get('data');
    
    return (data ? data.slack : null);
  }),
  twitter: Ember.computed('data', function() {
    "use strict";
    
    let data = this.get('data');
    
    return (data ? data.twitter : null);
  })
});
