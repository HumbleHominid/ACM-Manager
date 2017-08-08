import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  _notify: service('notify'),
  _socialMedia: service('social-media'),
  
  onlineUsers: 0,
  discordLink: '#',
  discordServerName: '',
  
  init() {
    "use strict";
    
    this._super(...arguments);
    
    setInterval((function(component) {
      Ember.$.ajax({
        type: 'GET',
        url: `https://discordapp.com/api/guilds/${component.get('_socialMedia.discord.serverId')}/widget.json`
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
    }) (this), 60 * 1000);
  }
});
