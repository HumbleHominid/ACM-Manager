import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  events: service(),
  currentUser: service(),
  
  activate() {
    "use strict";
    
    this.get('events').load();
    
    let feesRequestObj = {
      task: "GET_FEES_BY_MEMBER",
      token: this.get('currentUser.token'),
      data: {
        user_id: this.get('currentUser.id')
      }
    };
    (function(controller) {
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'https://katie.mtech.edu/~acmuser/backend/fees',
        data: JSON.stringify(feesRequestObj)
      }).done(function(data){
        controller.get('currentUser').loadFees(data.debtors.fees);
      }).fail(function(reason){
        console.log(reason);
      });
    }) (this);
  }
});
