import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  _notify: service('notify'),
  _metadata: service('metadata'), // need to do this later
  
  onlineUsers: 0,
  discordLink: '#',
  discordServerName: '',
  
  discordServerId: '221463858068324354',
  
  init() {
    "use strict";
    
    this._super(...arguments);
    
    setInterval((function(component) {
      Ember.$.ajax({
        type: 'GET',
        url: `https://discordapp.com/api/guilds/${component.get('discordServerId')}/widget.json`
      }).done((response) => {
        component.setProperties({
          onlineUsers: response.members.length,
          discordLink: response.instant_invite,
          discordServerName: response.name
        });
      }).fail(() => {
        component.get('_notify').alert("Could not fetch information from discord", {
          radius: true,
          closeAfter: 3 * 1000
        });
      });
    }) (this), 60 * 1000); // 60 seconds
  }
});
