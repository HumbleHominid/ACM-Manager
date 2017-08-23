import Ember from 'ember';
import ENV from 'acm-manager-web-application/config/environment';

const { inject: { service }, $ } = Ember;

export default Ember.Service.extend({
  notify: service(),
  
  _endPoint: null,
  _namespace: null,
  
  init() {
    "use strict";
    
    this._super(...arguments);
    
    let appSettings = ENV.APP;
    
    if (appSettings) {
      this.setProperties({
        _endPoint: appSettings.endPoint,
        _namespace: appSettings.namespace
      });
    }
  },
  getMetadata(tableName) {
    "use strict";
    
    return $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: `${this.get('url')}metadata`,
      data: JSON.stringify({
        task: "GET_METADATA",
        data: {
          endpoint: tableName
        }
      })
    }).done((data) => {
      return data;
    }).fail(() => {
      this.get('notify').alert(`Failed to fetch metadata for ${tableName}.`, {
        radius: true,
        closeAfter: 3 * 1000
      });
    });
  },
  endPoint: Ember.computed('_endPoint', function() {
    "use strict";
    
    return this.get('_endPoint');
  }),
  namespace: Ember.computed('_namespace', function() {
    "use strict";
    
    return this.get('_namespace');
  }),
  url: Ember.computed('_endPoint', '_namespace', function() {
    "use strict";
    
    return `${this.get('_endPoint')}${this.get('_namespace')}`;
  })
});
