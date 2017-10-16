import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service }, $ } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  events: service(),
  currentUser: service(),
  _metadata: service('metadata'),
  notify: service(),
  
  beforeModel(params) {
    "use strict";
    
    let qp = params.queryParams;
    let currentUser = this.get('currentUser');
    
    if (qp.id !== currentUser.id && currentUser.userType.user_type_id < 2) {
      // this.replaceWith('home');
    }
  },
  model(params, transition) { // jshint ignore:line
    "use strict";
    
    return { id: transition.queryParams.id };
  },
  activate() {
    "use strict";
    
    this.get('events').load();
    
    let feesRequestObj = {
      task: "GET_FEES_BY_MEMBER",
      token: this.get('currentUser.token'),
      data: {
        user_id: this.modelFor(this.get('routeName')).id
      }
    };
    
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: `${this.get('_metadata.url')}/fees`,
      data: JSON.stringify(feesRequestObj)
    }).done((data) => {
      if (data.reason) {
        this.get('notify').alert("Could not pull the fee data for this user." , {
          radius: true,
          closeAfter: 3 * 1000
        });
        
        return;
      }
      
      this.get('currentUser').loadFees(data.debtors.fees);
    }).fail(() => {
        this.get('notify').alert("Could not pull the fee data for this user." , {
          radius: true,
          closeAfter: 3 * 1000
        });
    });
  }
});
