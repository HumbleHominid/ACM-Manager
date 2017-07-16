import Ember from 'ember';

export default Ember.Service.extend({
  data: null,
  
  past: Ember.computed('data', function() {
    let data = this.get('data');
    
    return (data ? data.eventData.past : null);
  }),
  pastTyped: Ember.computed('data', function() {
    let past = { };
    
    this.get('data.eventData.past').forEach(function(event) {
      let eventTypeId = event.eventType.event_type_id;
      
      if (!(eventTypeId in past)) {
        past[eventTypeId] = {
          name: event.eventType.name,
          events: [ ]
        };
      }//if
      
      past[eventTypeId].events.push(event);
    }, this);
    
    return past;
  }),
  future: Ember.computed('data', function() {
    let data = this.get('data');
    
    return (data ? data.eventData.future : null);
  }),
  futureTyped: Ember.computed('data', function() {
    let future = { };
    
    this.get('data.eventData.future').forEach(function(event) {
      let eventTypeId = event.eventType.event_type_id;
      
      if (!(eventTypeId in future)) {
        future[eventTypeId] = {
          name: event.eventType.name,
          events: [ ]
        };
      }//if
      
      future[eventTypeId].events.push(event);
    }, this);
    
    return future;
  }),
  init() {
    this._super(...arguments);
    
    this.set('data', null);
  },
  load(data) {
    this.set('data', data);
  },
  empty() {
    this.get('data').clear();
  },
  read() {
    return this.get('data');
  }
});
