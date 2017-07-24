import Ember from 'ember';

export default Ember.Service.extend({
  endPoint: null,
  
  init() {
    this._super(...arguments);
    
    this.set('endPoint', null);
  },
  getMetadata(tableName) {
    return (function(service) {
      return Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: service.get('endPoint') + 'metadata',
        data: JSON.stringify({
          task: "GET_METADATA",
          data: {
            endpoint: tableName
          }
        })
      }).done(function(data) {
        return data;
      }).fail(function(/* jqXHW, textStatus, err */) {
        //fail
      });
    }) (this);
  }
});
