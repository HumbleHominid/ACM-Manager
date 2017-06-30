import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      events: [
        {
          name: "April Meeting",
          location: "Museum",
          eventTime: "2017-04-20T18:00:00",
          eventType: {
            name: "Meeting",
            description: ""
          }
        },
        {
          name: "April LAN Party",
          location: "Museum",
          eventTime: "2017-04-21T19:00:00",
          eventType: {
            name: "LAN",
            description: ""
          }
        },
        {
          name: "Trevor Fix It",
          location: "Anywhere",
          eventTime: "2017-06-26T17:00:00",
          eventType: {
            name: "Crying",
            description: ""
          }
        },
        {
          name: "Research",
          location: "Museum",
          eventTime: "2017-06-27T18:00:00",
          eventType: {
            name: "Google",
            description: ""
          }
        }
      ]
    };
  }
});
