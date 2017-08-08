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
  modalPrefix: 'create-event',
  
  didRender() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    let modal = $(`#${modalPrefix}-modal`);
    
    modal.on('shown.bs.modal', () => {
      $(`#${modalPrefix}-name`).focus();
    });
    
    modal.on('hidden.bs.modal', () => {
      $(`#${modalPrefix}-form`)[0].reset();
    });
  },
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
      
      let modalPrefix = this.get('modalPrefix');
      let formInformation = {
        coordinator: $(`#${modalPrefix}-coordinator`)[0].value,
        eventType: $(`#${modalPrefix}-eventType`)[0].value,
        name: $(`#${modalPrefix}-name`)[0].value,
        additionalInfo: $(`#${modalPrefix}-additionalInfo`)[0].value,
        location:  $(`#${modalPrefix}-location`)[0].value,
        eventTime: $(`#${modalPrefix}-eventTime`)[0].value,
        points: $(`#${modalPrefix}-points`)[0].value,
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
          $(`#${modalPrefix}-modal`).modal('hide');
          
          component.get('events').load();
          
          let eventData = data.eventData;
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
