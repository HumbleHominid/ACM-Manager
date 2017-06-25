import Ember from 'ember';

export function stringAppend(params/*, hash*/) {
  let returnString = "";
  
  params.forEach(function(param){
    returnString = returnString + param;
  });
  
  return returnString;
}

export default Ember.Helper.helper(stringAppend);
