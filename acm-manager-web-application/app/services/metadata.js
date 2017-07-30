import Ember from 'ember';

export default Ember.Service.extend({
  _endPoint: null,
  
  init() {
    this._super(...arguments);
    
    this.set('_endPoint', Ember.$(window)["0"].AcmManagerWebApplication.endPoint);
  },
  getMetadata(tableName) {
    return (function(service) {
      return Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: service.get('_endPoint') + 'metadata',
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
  },
  endPoint: Ember.computed('_endPoint', function() {
    return this.get('_endPoint');
  })
});
