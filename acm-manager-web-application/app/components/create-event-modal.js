import Ember from 'ember';

const { inject: { service }, $, RSVP: { Promise } } = Ember;

export default Ember.Component.extend({
  session: service(),
  currentUser: service(),
  events: service(),
  _notify: service('notify'),
  _metadata: service('metadata'),
  
  _requestTime: null,
  displayAddEventType: false,
  memberList: null,
  attendeeList: null,
  defaultPoints: 0,
  modalPrefix: "create-event",
  first: "name",
  
  didInsertElement() {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    
    $(`#${modalPrefix}-modal`).on('show.bs.modal', () => {
      this._updateEventType();
      this._fetchMembers();
    }).on('hidden.bs.modal', () => {
      this._updateEventType();
    });
  },
  init() {
    "use strict";
    
    this._super(...arguments);
    
    this.set('_requestTime', null);
    
    this.on('session.invalidationSucceeded', () => {
      this.setProperties({
        memberList: null,
        attendeeList: null
      });
    });
  },
  _fetchMembers() {
    "use strict";
    
    let metadata = this.get('_metadata');
    
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: `${metadata.get('url')}members`,
      data: JSON.stringify({
        task: 'LIST_MEMBERS',
        token: this.get('currentUser.token')
      })
    }).done((data) => {
      let list = this._makeList(data.memberList);
      
      this.setProperties({
        memberList: list,
        attendeeList: list
      });
    }).fail(() => {
      this.get('_notify').alert("Failed to pull member list.", {
        radius: true,
        closeAfter: 3 * 1000
      });
    });
  },
  _makeList(members) {
    "use strict";
    
    if (Ember.isArray(members)) {
      members.forEach(function(member, index) {
        members[index] = {
          text: `${member.lName}, ${member.fName}`,
          value: member.user_id,
          display: true
        };
      });
    }
    
    return members;
  },
  _updateEventType() {
    "use strict";
    
    let selectValue = $(`#${this.get('modalPrefix')}-eventType`)[0].value;
    let eventTypes = this.get('events.types');
    
    this.setProperties({
      displayAddEventType: parseInt(selectValue) === -1,
      defaultPoints: parseInt(selectValue) === -1 ? 0 : eventTypes[selectValue].defaultPoints
    });
  },
  eventTypes: Ember.computed('events.types', function()  {
    "use strict";
    
    let data = this.get('events.types');
    
    if (Ember.isArray(data)) {
      data.forEach(function(eventType, index) {
        data[index] = {
          text: eventType.name,
          value: index,
          display: true
        };
      });
      
      data.sort(function(a, b) {
        let nameA = a.text.toUpperCase();
        let nameB = b.text.toUpperCase();
        
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    }
    
    return data;
  }),
  _createEventType() {
    "use strict";
    
    return new Promise((resolve, reject) => {
      let modalPrefix = this.get('modalPrefix');
      
      let data = {
        name: $(`#${modalPrefix}-event-type-name`)[0].value,
        description: $(`#${modalPrefix}-event-type-description`)[0].value,
        defaultPoints: $(`#${modalPrefix}-event-type-points`)[0].value
      };
      
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: `${this.get('_metadata.url')}events`,
        data: JSON.stringify({
          task: "CREATE_EVENT_TYPE",
          token: this.get('currentUser.token'),
          data: data
        })
      }).done((response) => {
        if (Ember.isPresent(data.reason)) {
          this.get('_notify').alert(`Event type creation failed. ${data.reason}`, {
            radius: true,
            closeAfter: 3 * 1000
          });
          
          reject();
        }
        
        resolve(response.EventType);
      }).fail(() => {
        reject();
      });
    });
  },  
  _createEvent(eventTypeId = null) {
    "use strict";
    
    let modalPrefix = this.get('modalPrefix');
    
    let coordinator = $(`#${modalPrefix}-coordinator`)[0];
    let eventType = $(`#${modalPrefix}-eventType`)[0];
    let audience = $(`#${modalPrefix}-audience`)[0];
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
      eventType: eventTypeId ? eventTypeId : eventType.value,
      audience: audience.value,
      name: name.value,
      additionalInfo: additionalInfo.value,
      location: location.value,
      eventTime: eventTime.value,
      points: points.value,
      attendees: [ ]
    };
    
    this.get('attendeeList').forEach(function(attendee) {
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
    
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: `${this.get('_metadata.url')}events`,
      data: JSON.stringify({
        task: 'CREATE_EVENT',
        token: this.get('currentUser.token'),
        data: formInformation
      })
    }).done((data) => {
      if (Ember.isPresent(data.reason)) {
        this.get('_notify').alert(`Event creation failed. ${data.reason}`, {
          radius: true,
          closeAfter: 3 * 1000
        });
        
        return false;
      }
      
      $(`#${modalPrefix}-modal`).modal('hide');
      
      this.get('events').load();
      
      let eventData = data.eventData;
      let coordinator = eventData.coordinator;
      let timeString = new Date(eventData.eventTime.replace(' ', 'T')).toString();
      
      this.get('_notify').success(`New event titled "${data.eventData.name}" with coordinator "${coordinator.fName} ${coordinator.lName}" created for ${timeString}.`, {
        radius: true,
        closeAfter: 10 * 1000
      });
    }).fail(() => {
      this.get('_notify').alert("Event creation failed.", {
        radius: true,
        closeAfter: 3 * 1000
      });
    });

    return false;
  },
  actions: {
    submitForm() {
      "use strict";

      let modalPrefix = this.get('modalPrefix');
      
      let eventType = $(`#${modalPrefix}-eventType`)[0].value;
      
      if (parseInt(eventType) === -1) {
        this._createEventType().then((data) => {
          this._createEvent(data.event_type_id);
        }).catch(() => {
          this.get('_notify').alert("Failed to create the event type.", {
            radius: true,
            closeAfter: 3 * 1000
          });
        });
      }
      else {
        this._createEvent();
      }
      
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
