import Ember from 'ember';

export default Ember.Service.extend({
  _endPoint: null,
  
  init() {
    this._super(...arguments);
    
    let domWindow = Ember.$(window);
    
    if (domWindow["0"].AcmManagerWebApplication) {
      this.set('_endPoint', domWindow["0"].AcmManagerWebApplication.endPoint);
    }
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
