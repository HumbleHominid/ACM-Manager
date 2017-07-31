import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [ "list:list-group-item"],
  date: "",
  time: "",
  list: true,
  horizontal: false,
  collapsable: true,
  suffix: "",
  
  init() {
    "use strict";
    
    this._super(...arguments);
    
    let eventTime = this.get('data.eventTime');

    if (eventTime) {
      let dateTime = new Date(eventTime.replace(' ', 'T'));
      
      this.set('date', dateTime.toDateString());
      this.set('time', dateTime.toTimeString().split(" ")[0]);
    }
  }
});
