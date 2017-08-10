import Ember from 'ember';

const { $ } = Ember;

export default Ember.Service.extend({
  _data: null,
  
  init() {
    "use strict";
    
    this._super(...arguments);
   
    let appSettings = $(window)["0"].AcmManagerWebApplication;
    
    if (appSettings) {
      this.set('_data', appSettings.socialMedia);
    }
    else {
      this.set('_data', null);
    }
  },
  discord: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return (data ? data.discord : null);
  }),
  facebook: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return (data ? data.facebook : null);
  }),
  instagram: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return (data ? data.instagram : null);
  }),
  slack: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return (data ? data.slack : null);
  }),
  twitter: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return (data ? data.twitter : null);
  })
});
