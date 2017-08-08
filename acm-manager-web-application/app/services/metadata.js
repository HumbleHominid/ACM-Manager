import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Service.extend({
  notify: service(),
  
  _endPoint: null,
  
  init() {
    "use strict";
    
    this._super(...arguments);
    
    let domWindow = $(window);
    
    if (domWindow["0"].AcmManagerWebApplication) {
      this.set('_endPoint', domWindow["0"].AcmManagerWebApplication.endPoint);
    }
  },
  getMetadata(tableName) {
    "use strict";
    
    return (function(service) {
      return $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: `${service.get('metadata.endPoint')}metadata`,
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
  })
});
