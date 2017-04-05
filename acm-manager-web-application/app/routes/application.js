import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return { routeName: this.get('router.url').split('/')[1] };
  }
});