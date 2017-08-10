import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  _metadata: service('metadata'),
  session: service(),
  notify: service(),
  currentUser: service(),
  
  _data: null,
  _requestTime: null,
  
  init() {
    "use strict";
    
    this.clear();
  },
  load() {
    "use strict";
    
    this.get('_metadata').getMetadata('Announcements').then((data) => {
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
    let jwt = (session.get('isAuthenticated') ? this.get('currentUser.token') : null);
    
    (function(service) {
      let metadata = service.get('_metadata');
      
      Ember.$.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: `${metadata.get('endPoint')}${metadata.get('namespace')}announcements`,
        data: JSON.stringify({
          task: "GET_ACTIVE",
          token: jwt
        })
      }).done(function(data) {
        service.set('_data', data);
      }).fail(function() {
        service.get('notify').alert("Could not fetch announcements.", {
          closeAfter: 3 * 1000,
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
