import Ember from 'ember';

export function isEqual([ arg0, arg1 ]) {
  "use strict";
  
  return arg0 === arg1;
}

export default Ember.Helper.helper(isEqual);
