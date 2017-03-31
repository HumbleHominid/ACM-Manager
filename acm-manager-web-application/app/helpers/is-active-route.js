import Ember from 'ember';

export function isActiveRoute(params) {
  return params[0].toLowerCase() === params[1].toLowerCase();
}

export default Ember.Helper.helper(isActiveRoute);
