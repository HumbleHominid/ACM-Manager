import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  events: service(),
  
  filterTime: true,
  filterType: false,
  filterSearch: false,
  
  eventData: Ember.computed('filterTime', 'filterType', 'filterSearch', 'events.data', function() {
    if (this.get('filterSearch')) {
      let query = Ember.$('#events-searchbar')[0].value;
      
      if (this.get('filterTime')) {
        return this.get('events').search(query);
      }
      else if (this.get('filterType')) {
        return this.get('events').searchTyped(query);
      }
    }
    else {
      let events = this.get('events');
      let data = { };
      
      if (this.get('filterTime')) {
        data.past = events.get('past');
        data.future = events.get('future');
      }
      else if (this.get('filterType')) {
        data.past = events.get('pastTyped');
        data.future = events.get('futureTyped');
      }
      
      return data;
    }
  }),
  actions: {
    filterTime() {
      this.setProperties({
        filterTime: true,
        filterType: false
      });
    },
    filterType() {
      this.setProperties({
        filterTime: false,
        filterType: true
      });
    },
    search() {
      let query = Ember.$('#events-searchbar')[0].value;
      
      if (query.length > 2) {
        this.set('filterSearch', true);
      }
      else {
        this.set('filterSearch', false);
      }
    }
  }
});
