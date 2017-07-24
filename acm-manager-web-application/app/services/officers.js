import Ember from 'ember';

export default Ember.Service.extend({
  metadata: Ember.inject.service(),
  
  data: null,
  
  init() {
    this._super(...arguments);
    
    this.set('data', null);
  },
  president: Ember.computed('data', function() {
    let data = this.get('data');
    
    if (data) {
      return data.president;
    }
  }),
  vicePresident: Ember.computed('data', function() {
    let data = this.get('data');
    
    if (data) {
      return data.vicePresident;
    }
  }),
  secretary: Ember.computed('data', function() {
    let data = this.get('data');
    
    if (data) {
      return data.secretary;
    }
  }),
  treasurer: Ember.computed('data', function() {
    let data = this.get('data');
    
    if (data) {
      return data.treasurer;
    }
  }),
  load() {
    (function(service) {
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: service.get('metadata.endPoint') + 'officers',
        data: JSON.stringify({
          task: "GET_OFFICERS"
        })
      }).done(function(data) {
        return Ember.$.getJSON('officerData.json').then(function(officerSettings) {
          Object.keys(officerSettings).forEach(function(key) {
            if (data[key]) {
              data[key].settings = officerSettings[key];
            }
          });
          
          service.set('data', data);
        });
      }).fail(function() {
        //fail
      });
    }) (this);
  },
  read() {
    return this.get('data');
  },
  clear() {
    this.set('data', null);
  }
});
