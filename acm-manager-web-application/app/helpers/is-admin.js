import Ember from 'ember';

export function isAdmin([arg1]) {
  return parseInt(arg1) > 1;
}

export default Ember.Helper.helper(isAdmin);
