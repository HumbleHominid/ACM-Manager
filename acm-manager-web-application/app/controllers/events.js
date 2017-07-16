import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  events: service(),
  
  filterTime: true,
  filterType: false,
  
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
    }
  }
});
