import Ember from 'ember';

export function isActiveRoute([ arg0, arg1 ]) {
  "use strict";
  
  return arg0 === arg1;
}

export default Ember.Helper.helper(isActiveRoute);
