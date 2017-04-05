import Ember from 'ember';

export function isActiveRoute([arg1, arg2]) {
  if ((arg1 === '' && arg2 === 'home') || (arg1 === 'home' && arg2 === '')){
    return true;
  }//if

  return arg1 === arg2;
}

export default Ember.Helper.helper(isActiveRoute);
