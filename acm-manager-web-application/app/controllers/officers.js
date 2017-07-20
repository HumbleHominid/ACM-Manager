import Ember from 'ember';

export default Ember.Controller.extend({
  officers: Ember.inject.service(),
  
  officerData: Ember.computed('officers', function() {
    return this.get('officers').read();
  })
});
