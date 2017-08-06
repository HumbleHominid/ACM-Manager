import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  currentUser: service(),
  events: service()
});
