import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  session: service(),
  currentUser: service(),
  events: service(),
  _notify: service('notify'),
  _metadata: service('metadata'),
  
  _requestTime: null,
  displayAddEventType: false,
  memberList: [ ],
  attendeeList: [ ],
  modalPrefix: 'create-event',
  
  didRender() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    
    $(`#${modalPrefix}-modal`).on('shown.bs.modal', () => {
      $(`#${modalPrefix}-name`).focus();
      
      this._updateEventType();
    }).on('hidden.bs.modal', () => {
      $(`#${modalPrefix}-form`)[0].reset();
      
      this._updateEventType();
    });
  },
  init() {
    "use strict";
    
    this._super(...arguments);
    
    this.setProperties({
      memberList: [ ],
      attendeeList: [ ],
      _requestTime: null
    });
    
    this.on('session.store.sessionDataUpdated', (() => this._fetchMembers()) ());
  },
  _fetchMembers() {
    "use strict";
    
    (function(component) {
      let metadata = component.get('_metadata');
      
      $.ajax({
        type: 'POST', 
        contentType: 'application/json',
        url: `${metadata.get('endPoint')}${metadata.get('namespace')}members`,
        data: JSON.stringify({
          task: 'LIST_MEMBERS',
          token: component.get('currentUser.token')
        })
      }).done(function(data) {
        let list = component._makeList(data.memberList);
        
        component.setProperties({
          memberList: list,
          attendeeList: list
        });
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
          value: member.user_id,
          display: true
        };
      });
    }
    
    return members;
  },
  _updateEventType() {
    "use strict";
    
    let select = $(`#${this.get('modalPrefix')}-eventType`);
    
    this.set('displayAddEventType', parseInt(select[0].value) === -1);
  },
  eventTypes: Ember.computed('events.types', function()  {
    "use strict";
    
    let data = this.get('events.types');
    
    if (Ember.isArray(data)) {
      data.forEach(function(eventType, index) {
        data[index] = {
          text: eventType.name,
          value: eventType.event_type_id,
          display: true
        };
      });
    }
    
    return data;
  }),
  actions: {
    formSubmit(e) {
      "use strict";
      
      if (!e.isTrusted) {
        return;
      }
      
      let modalPrefix = this.get('modalPrefix');
      
      let coordinator = $(`#${modalPrefix}-coordinator`)[0];
      let eventType = $(`#${modalPrefix}-eventType`)[0];
      let name = $(`#${modalPrefix}-name`)[0];
      let additionalInfo = $(`#${modalPrefix}-additionalInfo`)[0];
      let location = $(`#${modalPrefix}-location`)[0];
      let eventTime = $(`#${modalPrefix}-eventTime`)[0];
      let points = $(`#${modalPrefix}-points`)[0];
      
      if (!(coordinator && eventType && name && additionalInfo && location && eventTime && points)) {
        this.get('_notify').alert("Could not fetch all form data.", {
          radius: true,
          closeAfter: 3 * 1000
        });
        
        return false;
      }
      
      let formInformation = {
        coordinator: coordinator.value,
        eventType: eventType.value,
        name: name.value,
        additionalInfo: additionalInfo.value,
        location: location.value,
        eventTime: eventTime.value,
        points: points.value,
        attendees: [ ]
      };
      let attendees = this.get('attendeeList');
      
      attendees.forEach(function(attendee) {
        if (!attendee.display) {
          let attendeePoints = $(`#${modalPrefix}-attendee-points-${attendee.value}`)[0];
          let attendeeInfo = $(`#${modalPrefix}-attendee-info-${attendee.value}`)[0];
          
          let obj = {
            user_id: attendee.value,
            givenPoints: attendeePoints ? attendeePoints.value : 0,
            additionalInfo: attendeeInfo ? attendeeInfo.value : ""
          };
          
          formInformation.attendees.push(obj);
        }
      });

      (function(component) {
        let metadata = component.get('_metadata');
        
        $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: `${metadata.get('endPoint')}${metadata.get('namespace')}events`,
          data: JSON.stringify({
            task: 'CREATE_EVENT',
            token: component.get('currentUser.token'),
            data: formInformation
          })
        }).done(function(data) {
          if (Ember.isPresent(data.reason)) {
            component.get('_notify').alert(`Event creation failed. ${data.reason}`, {
              radius: true,
              closeAfter: 3 * 1000
            });
            
            return false;
          }
          
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
    },
    selectEventTypeChanged(e) {
      "use strict";
      
      if (!e.isTrusted) {
        return;
      }
      
      this._updateEventType();
    },
    addAttendeeChanged(e) {
      "use strict";
      
      if (!e.isTrusted) {
        return;
      }
      
      let select = $(`#${this.get('modalPrefix')}-add-attendee`);
      let attendees = this.get('attendeeList');
      
      for (let i = 0; i < attendees.length; i++) {
        if (parseInt(attendees[i].value) === parseInt(select[0].value)) {
          this.set(`attendeeList.${i}.display`, false);
          
          break;
        }
      }
    },
    removeAttendee(index, e) {
      "use strict";
      
      if (!e.isTrusted) {
        return;
      }
      
      this.set(`attendeeList.${index}.display`, true);
    }
  }
});
