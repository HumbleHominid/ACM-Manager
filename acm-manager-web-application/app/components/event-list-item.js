import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [ "list:list-group-item"],
  date: "",
  time: "",
  list: true,
  horizontal: false,
  collapsable: true,
  
  init() {
    this._super(...arguments);
    
    let eventTime = this.get('data.eventTime');

    if (eventTime) {
      let dateTime = new Date(this.get('data.eventTime'));
      
      this.set('date', dateTime.toDateString());
      this.set('time', dateTime.toTimeString().split(" ")[0]);
    }
  }
});
