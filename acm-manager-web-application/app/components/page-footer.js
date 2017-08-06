import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  tagName: 'footer',
  classNames: [ 'container-footer', 'container-fluid' ],
  
  session: service(),
  currentUser: service()
});
