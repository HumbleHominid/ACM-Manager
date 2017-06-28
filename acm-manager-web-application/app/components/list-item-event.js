import Ember from 'ember';

export default Ember.Component.extend({
  date: "",
  time: "",
  
  init() {
    this._super(...arguments);
    
    let dateTime = new Date(this.get('data.eventTime'));
    
    this.set('date', dateTime.toDateString());
    this.set('time', dateTime.toTimeString().split(" ")[0]);
  }
});
