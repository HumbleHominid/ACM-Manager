import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  currentUser: service(),
  officers: service(),
  
  init() {
    this._super(...arguments);
    
    let officers = this.get('officers');
    
    if (!officers.get('data')) {
      return Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://katie.mtech.edu/~acmuser/backend/officers',
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
          
          return officers.load(data);
        });
      }).fail(function() {
        //fail
      });
    }
    else {
      return;
    }
  }
});
