import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      events: [
        {
          title: "April Meeting",
          location: "Museum",
          date: "April 20, 2017",
          time: "6:00 p.m.",
          type: "meeting"
        },
        {
          title: "April LAN Party",
          location: "Museum",
          date: "April 21, 2017",
          time: "7:00 p.m.",
          type: "lan"
        }
      ]
    };
  }
});
