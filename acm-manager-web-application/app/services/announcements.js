import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  metadata: service(),
  session: service(),
  notify: service(),
  
  _data: null,
  _requestTime: null,
  
  init() {
    "use strict";
    
    this.clear();
  },
  load() {
    "use strict";
    
    this.get('metadata').getMetadata('Announcements').then((data) => {
      let metadata = data.metadata;
      let metadataTime = (metadata ? new Date(metadata.updateTime.replace(' ', 'T')) : null);
      
      if (Ember.compare(metadataTime, this.get('_requestTime')) >= 0) {
        this._fetchAnnouncements();
      }
    });
  },
  _fetchAnnouncements() {
    "use strict";
    
    let session = this.get('session');
    let jwt = (session.get('data.authenticated') ? session.get('data.authenticated.user.jwt') : null);
    
    (function(service) {
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: `${service.get('metadata.endPoint')}announcements`,
        data: JSON.stringify({
          task: "GET_ACTIVE",
          token: jwt
        })
      }).done(function(data) {
        service.set('_data', data);
      }).fail(function() {
        service.get('notify').alert("Could not fetch announcements.", {
          closeAfter: 5000,
          radius: true
        });
      });
    }) (this);
  },
  data: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return data ? data : null;
  }),
  count: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');

    return data ? data.autoAnnos.length + data.currentAnnos.length : 0;
  }),
  clear() {
    "use strict";
    
    this.setProperties({
      _data: null,
      _requestTime: null
    });
  }
});
