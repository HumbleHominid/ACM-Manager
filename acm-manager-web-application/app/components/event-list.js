import Ember from 'ember';

export default Ember.Component.extend({
  filterTime: true,
  filterType: false,
  suffix: "",
  title: "",
  data: null,
  expanded: false,
  
  tagName: ''
});
