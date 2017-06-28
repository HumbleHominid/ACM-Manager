import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      events: [
        {
          name: "April Meeting",
          location: "Museum",
          date: "April 20, 2017",
          time: "6:00 p.m.",
          eventType:{
            name: "Meeting",
            description: ""
          }
        },
        {
          name: "April LAN Party",
          location: "Museum",
          date: "April 21, 2017",
          time: "7:00 p.m.",
          eventType:{
            name: "LAN",
            description: ""
          }
        },
        {
          name: "Trevor Fix It",
          location: "Anywhere",
          date: "Now",
          time: "All day",
          eventType:{
            name: "Crying",
            description: ""
          }
        },
        {
          name: "Research",
          location: "Museum",
          date: "April 420, 2017",
          time: "7:00 p.m.",
          eventType:{
            name: "Google",
            description: ""
          }
        }
      ]
    };
  }
});
