import Ember from 'ember';

export default Ember.Component.extend({
  data: null,
  suffix: "",
  key: "",
  tagName: '',
  
  actions: {
    editSelected() {
      "use strict";
      
      this.get('editButtonSelected') ();
    }
  }
});
