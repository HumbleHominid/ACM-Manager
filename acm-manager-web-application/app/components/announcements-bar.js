import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  announcements: service(),
  events: service(),
  
  classNames: [ "announcements-container" ]
});
