import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  members: service(),
  currentUser: service(),
  
  smallScreen: false,
  
  didInsertElement() {
    "use strict";
    
    this.set('smallScreen', parseInt(Ember.$(window).width()) < 1225);
    this.get('members').load();
  },
  actions: {
    searchMembers() {
      "use strict";
      
      let searchString = $('#user-searchbar')[0].value;
      let foundMembers = this.get('members').search(searchString);
      
      console.log(foundMembers)
    },
    formSubmit() {
      "use strict";
      
      return false;
    }
  }
});
