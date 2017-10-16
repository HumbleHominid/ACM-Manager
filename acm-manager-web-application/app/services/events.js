import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Service.extend({
  session: service(),
  _metadata: service('metadata'),
  currentUser: service(),
  
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
    
    return data && data.eventData ? data.eventData.past : null;
  }),
  pastTyped: Ember.computed('_data', function() {
    "use strict";
    
    let past = { };
    let pastEvents = this.get('past');
    
    if (Ember.isNone(pastEvents)) {
      return null;
    }
    
    if (Ember.isPresent(pastEvents)) {
      pastEvents.forEach(function(event) {
        let eventTypeId = event.eventType.event_type_id;
        
        if (!(eventTypeId in past)) {
          past[eventTypeId] = {
            name: event.eventType.name,
            events: [ ]
          };
        }
        
        past[eventTypeId].events.push(event);
      });
    }
    
    return past;
  }),
  future: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return data && data.eventData ? data.eventData.future : null;
  }),
  futureTyped: Ember.computed('_data', function() {
    "use strict";
    
    let future = { };
    let futureEvents = this.get('future');
    
    if (Ember.isNone(futureEvents)) {
      return null;
    }
    
    if (Ember.isPresent(futureEvents)) {
      futureEvents.forEach(function(event) {
        let eventTypeId = event.eventType.event_type_id;
        
        if (!(eventTypeId in future)) {
          future[eventTypeId] = {
            name: event.eventType.name,
            events: [ ]
          };
        }
        
        future[eventTypeId].events.push(event);
      });
    }
    
    return future;
  }),
  types: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return (data ? data.eventTypes : null);
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
          }
          
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
          }
          
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
    
    this.get('_metadata').getMetadata('Events').then((data) => {
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
    let jwt = (session.get('isAuthenticated') ? this.get('currentUser.token') : null);
    
    let metadata = this.get('_metadata');
    
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: `${metadata.get('url')}events`,
      data: JSON.stringify({
        task: "GET_LIST",
        token: jwt
      })
    }).done((data) => {
      let eventData = Ember.copy(data, true);
      
      this.set('_data', eventData);
    }).fail(() => {
      this.get('notify').alert("Failed to pull events", {
        radius: true,
        closeAfter: 3 * 1000
      });
    });
  },
  clear() {
    "use strict";
    
    this.setProperties({
      _data: null,
      _requestTime: null
    });
  }
});
