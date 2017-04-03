import Ember from 'ember';

export function underscoreToSpace([arg0]) {
  return arg0.replace(/_/g, ' ');
}

export default Ember.Helper.helper(underscoreToSpace);
