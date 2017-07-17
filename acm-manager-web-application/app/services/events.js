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
    });
    
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
    });
    
    return future;
  }),
  search(query) {
    let data = this.get('data');
    
    if (data) {
      let re = new RegExp(query, 'gi');
      let events = {
        past: [ ],
        future: [ ]
      };
      
      data.eventData.past.forEach(function(event) {
        if (event.name.match(re) || event.eventType.name.match(re)) {
          events.past.push(event);
        }
      });
      
      data.eventData.future.forEach(function(event) {
        if (event.name.match(re) || event.eventType.name.match(re)) {
          events.future.push(event);
        }
      });
      
      return events;
    }
  },
  searchTyped(query) {
    let data = this.get('data');
    
    if (data) {
      let re = new RegExp(query, 'gi');
      let events = {
        past: [ ],
        future: [ ]
      };
      
      data.eventData.past.forEach(function(event) {
        let eventTypeId = event.eventType.event_type_id;
      
        if (event.name.match(re) || event.eventType.name.match(re)) {
          if (!(eventTypeId in events.past)) {
            events.past[eventTypeId] = {
              name: event.eventType.name,
              events: [ ]
            };
          }//if
          
          events.past[eventTypeId].events.push(event);
        }
      });
      
      data.eventData.future.forEach(function(event) {
        let eventTypeId = event.eventType.event_type_id;
      
        if (event.name.match(re) || event.eventType.name.match(re)) {
          if (!(eventTypeId in events.future)) {
            events.future[eventTypeId] = {
              name: event.eventType.name,
              events: [ ]
            };
          }//if
          
          events.future[eventTypeId].events.push(event);
        }
      });
      
      return events;
    }
  },
  init() {
    this._super(...arguments);
    
    this.set('data', null);
  },
  load(data) {
    this.set('data', data);
  },
  clear() {
    this.set('data', null);
  },
  read() {
    return this.get('data');
  }
});
