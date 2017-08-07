import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  session: service(),
  currentUser: service(),
  events: service(),
  _notify: service('notify'),
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
        component.get('_notify').alert("Failed to pull member list.", {
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
          value: eventType.event_type_id
        };
      });
    }
    
    return data;
  }),
  actions: {
    formSubmit() {
      "use strict";
      
      let formInformation = {
        coordinator: $('#create-event-coordinator')[0].value,
        eventType: $('#create-event-eventType')[0].value,
        name: $('#create-event-name')[0].value,
        additionalInfo: $('#create-event-additionalInfo')[0].value,
        location:  $('#create-event-location')[0].value,
        eventTime: $('#create-event-eventTime')[0].value,
        points: $('#create-event-points')[0].value,
        attendees: [ ]
      };

      (function(component) {
        $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: `${component.get('_metadata.endPoint')}events`,
          data: JSON.stringify({
            task: 'CREATE_EVENT',
            token: component.get('currentUser.token'),
            data: formInformation
          })
        }).done(function(data) {
          $('#create-event-form')[0].reset();
          
          $('#create-event-modal').modal('hide');
          
          component.get('events').load();
          
          let eventData = data.eventData
          let coordinator = eventData.coordinator;
          let timeString = new Date(eventData.eventTime.replace(' ', 'T')).toString();
          
          component.get('_notify').success(`New event titled "${data.eventData.name}" with coordinator "${coordinator.fName} ${coordinator.lName}" created for ${timeString}.`, {
            radius: true,
            closeAfter: 10 * 1000
          });
        }).fail(function() {
          component.get('_notify').alert("Event creation failed.", {
            radius: true,
            closeAfter: 3 * 1000
          });
        });
      }) (this);

      return false;
    }
  }
});
