import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  session: service(),
  metadata: service(),
  
  _data: null,
  _requestTime: null,
  
  data: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return data ? data : null;
  }),
  past: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return (data ? data.eventData.past : null);
  }),
  pastTyped: Ember.computed('_data', function() {
    "use strict";
    
    let past = { };
    let pastEvents = this.get('_data.eventData.past');
    
    if (Ember.isPresent(pastEvents)) {
      pastEvents.forEach(function(event) {
        let eventTypeId = event.eventType.event_type_id;
        
        if (!(eventTypeId in past)) {
          past[eventTypeId] = {
            name: event.eventType.name,
            events: [ ]
          };
        }//if
        
        past[eventTypeId].events.push(event);
      });
    }
    
    return past;
  }),
  future: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return (data ? data.eventData.future : null);
  }),
  futureTyped: Ember.computed('_data', function() {
    "use strict";
    
    let future = { };
    let futureEvents = this.get('_data.eventData.future');
    
    if (Ember.isPresent(futureEvents)) {
      futureEvents.forEach(function(event) {
        let eventTypeId = event.eventType.event_type_id;
        
        if (!(eventTypeId in future)) {
          future[eventTypeId] = {
            name: event.eventType.name,
            events: [ ]
          };
        }//if
        
        future[eventTypeId].events.push(event);
      });
    }
    
    return future;
  }),
  search(query) {
    "use strict";
    
    let data = this.get('_data');
    
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
    "use strict";
    
    let data = this.get('_data');
    
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
    "use strict";
    
    this._super(...arguments);
    
    this.clear();
  },
  load() {
    "use strict";
    
    this.get('metadata').getMetadata('Events').then((data) => {
      let metadata = data.metadata;
      let metadataTime = (metadata ? new Date(metadata.updateTime.replace(' ', 'T')) : null);
      
      if (Ember.compare(metadataTime, this.get('_requestTime')) >= 0) {
        this._fetchEvents();
      }
    });
  },
  _fetchEvents() {
    "use strict";
    
    let session = this.get('session');
    let jwt = (session.get('data.authenticated') ? session.get('data.authenticated.user.jwt') : null);
    
    (function(service) {
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: service.get('metadata.endPoint') + 'events',
        data: JSON.stringify({
          task: "GET_LIST",
          token: jwt
        })
      }).done(function(data) {
        let eventData = Ember.copy(data, true);
        
        service.set('_data', eventData);
      }).fail(function(/* jqXHW, textStatus, err */) {
        //fail
      });
    }) (this);
  },
  clear() {
    "use strict";
    
    this.setProperties({
      _data: null,
      _requestTime: null
    });
  },
  read() {
    "use strict";
    
    return this.get('_data');
  }
});
