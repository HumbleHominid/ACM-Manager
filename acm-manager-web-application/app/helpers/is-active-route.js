import Ember from 'ember';

export function isActiveRoute([arg1, arg2]) {
  return arg1 === arg2;
}

export default Ember.Helper.helper(isActiveRoute);
