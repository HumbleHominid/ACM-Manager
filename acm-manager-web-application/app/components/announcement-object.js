import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  currentUser: service(),
  session: service(),
  
  title: "Important",
  message: "",
  showEdit: true,
  
  actions: {
    editClicked(data) {
      "use strict";
      
      this.get('editClickedCallback') (data);
    }
  }
});
