import Ember from 'ember';

export default Ember.Component.extend({
  announcements: Ember.inject.service(),
  
  classNames: [ "announcements-container" ]
});
