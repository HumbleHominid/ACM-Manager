import Ember from 'ember';

export function isOne([ arg ]) {
  return arg === 1 || (Ember.isArray(arg) && arg.length === 1);
}

export default Ember.Helper.helper(isOne);
