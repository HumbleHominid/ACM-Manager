import Ember from 'ember';

export function isAdmin(params) {
  return params[0] > 1;
}

export default Ember.Helper.helper(isAdmin);
