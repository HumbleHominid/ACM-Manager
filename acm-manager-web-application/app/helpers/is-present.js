import Ember from 'ember';

export function isPresent([ arg ]) {
  "use strict";
  
  return Ember.isPresent(arg);
}

export default Ember.Helper.helper(isPresent);
