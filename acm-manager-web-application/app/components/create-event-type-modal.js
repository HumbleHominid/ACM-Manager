import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Component.extend({
  _notify: service('notify'),
  _metadata: service('metadata'),
  events: service(),
  session: service(),
  currentUser: service(),
  
  modalPrefix: "create-event-type",
  first: "name",
  
  actions: {
    createNewType(e) {
      "use strict";
      
      if (!e.isTrusted) {
        return;
      }
      
      let modalPrefix = this.get('modalPrefix');
      
      let data = {
        name: $(`#${modalPrefix}-name`)[0].value,
        description: $(`#${modalPrefix}-description`)[0].value,
        defaultPoints: $(`#${modalPrefix}-points`)[0].value
      };
      
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: `${this.get('_metadata.url')}events`,
        data: JSON.stringify({
          task: 'CREATE_EVENT_TYPE',
          token: this.get('currentUser.token'),
          data: data
        })
      }).done((data) => {
        $(`#${modalPrefix}-modal`).modal('hide');
        
        this.get('events').load();
          
        this.get('_notify').success(`New event type created called ${data.EventType.name}.`, {
          radius: true,
          closeAfter: 3 * 1000
        });
      }).fail(() => {
        this.get('_notify').alert("Event type creation failed.", {
          radius: true,
          closeAfter: 3 * 1000
        });
      });
      
      return false;
    }
  }
});
