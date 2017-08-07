import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: service(),
  currentUser: service(),
  events: service(),
  notify: service(),
  _metadata: service('metadata'),
  
  _requestTime: null,
  memberList: null,
  
  init() {
    "use strict";
    
    this._super(...arguments);
    
    this.set('members', null);
    
    this._fetchMembers();
    
    this.on('session.store.sessionDataUpdated', this._fetchMembers());
  },
  _fetchMembers() {
    "use strict";
    
    (function(component) {
      Ember.$.ajax({
        type: 'POST', 
        contentType: 'application/json',
        url: `${component.get('_metadata.endPoint')}members`,
        data: JSON.stringify({
          task: 'LIST_MEMBERS',
          token: component.get('currentUser.token')
        })
      }).done(function(data) {
        component.set('memberList', component._makeList(data.memberList));
      }).fail(function() {
        component.get('notify').alert("Failed to pull member list.", {
          radius: true,
          closeAfter: 3 * 1000
        });
      });
    }) (this);
  },
  _makeList(members) {
    "use strict";
    
    if (Ember.isArray(members)) {
      members.forEach(function(member, index) {
        members[index] = {
          text: `${member.fName} ${member.lName}`,
          value: member.user_id
        };
      });
    }
    
    return members;
  },
  eventTypes: Ember.computed('events.types', function()  {
    "use strict";
    
    let data = this.get('events.types');
    
    if (Ember.isArray(data)) {
      data.forEach(function(eventType, index) {
        data[index] = {
          text: eventType.name,
          value: eventType
        };
      });
    }
    
    return data;
  })
});
