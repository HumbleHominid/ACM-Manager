import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Service.extend({
  notify: service(),
  
  _endPoint: null,
  _namespace: null,
  
  init() {
    "use strict";
    
    this._super(...arguments);
    
    let appSettings = $(window)["0"].AcmManagerWebApplication;
    
    if (appSettings) {
      
      this.setProperties({
        _endPoint: appSettings.endPoint,
        _namespace: appSettings.namespace
      });
    }
  },
  getMetadata(tableName) {
    "use strict";
    
    return (function(service) {
      return $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: `${service.get('_endPoint')}${service.get('_namespace')}metadata`,
        data: JSON.stringify({
          task: "GET_METADATA",
          data: {
            endpoint: tableName
          }
        })
      }).done(function(data) {
        return data;
      }).fail(function(/* jqXHW, textStatus, err */) {
        service.get('notify').alert(`Failed to fetch metadata for ${tableName}.`, {
          radius: true,
          closeAfter: 3 * 1000
        });
      });
    }) (this);
  },
  endPoint: Ember.computed('_endPoint', function() {
    "use strict";
    
    return this.get('_endPoint');
  }),
  namespace: Ember.computed('_namespace', function() {
    "use strict";
    
    return this.get('_namespace');
  })
});
