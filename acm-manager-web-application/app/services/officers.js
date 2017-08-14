import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Service.extend({
  _metadata: service('metadata'),
  notify: service(),
  
  _data: null,
  _requestTime: null,
  
  init() {
    "use strict";
    
    this._super(...arguments);
    
    this.setProperties({
      _data: null,
      _requestTime: null
    });
  },
  president: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return data ? data.president : null;
  }),
  vicePresident: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return data ? data.vicePresident : null;
  }),
  secretary: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return data ? data.secretary : null;
  }),
  treasurer: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return data ? data.treasurer : data;
  }),
  data: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return data ? data : null;
  }),
  load() {
    "use strict";
    
    this.get('_metadata').getMetadata('Officers').then((data) => {
      let metadata = data.metadata;
      let metadataTime = (metadata ? new Date(metadata.updateTime.replace(' ', 'T')) : null);
      
      if (Ember.compare(metadataTime, this.get('_requestTime')) >= 0) {
        this._fetchOfficers();
      }
    });
  },
  _fetchOfficers() {
    "use strict";
    
    let metadata = this.get('_metadata');
    
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: `${metadata.get('url')}officers`,
      data: JSON.stringify({
        task: "GET_OFFICERS"
      })
    }).done((data) => {
      return $.getJSON('officerData.json').then((officerSettings) => {
        Object.keys(officerSettings).forEach(function(key) {
          if (data[key]) {
            data[key].settings = officerSettings[key];
          }
        });
        
        this.set('_data', data);
        this.set('_requestTime', new Date());
      });
    }).fail(() => {
      this.get('notify').alert("Failed to pull officer information.", {
        radius: true,
        closeAfter: 3 * 1000
      });
    });
  },
  clear() {
    "use strict";
    
    this.set('_data', null);
  }
});
