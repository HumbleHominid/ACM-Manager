import Ember from 'ember';

export function isOne([arg]) {
  "use strict";
  
  return arg === 1 || (Ember.isArray(arg) && arg.length === 1);
}

export default Ember.Helper.helper(isOne);
