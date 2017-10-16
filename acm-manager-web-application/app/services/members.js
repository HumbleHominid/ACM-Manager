import Ember from 'ember';

const { inject: { service }, $ } = Ember;

export default Ember.Service.extend({
  _metadata: service('metadata'),
  _notify: service('notify'),
  session: service(),
  currentUser: service(),
  
  _data: null,
  
  init() {
    "use strict";
    
    this.clear();
  },
  load() {
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
    }).done((data) => {console.log(data)
      this.set('_data', data.memberList);
    }).fail(() => {
      this.get('_notify').alert("Failed to pull member list.", {
        radius: true,
        closeAfter: 3 * 1000
      });
    });
  },
  search(searchString) {
    "use strict";
    
    let string = searchString.toLowerCase();
    let members = this.get('data');
    
    if (Ember.isNone(members) || !Ember.isArray(members)) {
      return;
    }
  
    let foundMembers = [ ];
    
    members.forEach(function(member) {
      let name = member.fName + " " + member.lName;
      
      if (name.indexOf(string) !== -1) {
        foundMembers.push(member);
      }
    });
    
    return foundMembers;
  },
  data: Ember.computed('_data', function() {
    "use strict";
    
    let data = this.get('_data');
    
    return data ? data : null;
  }),
  clear() {
    "use strict";
    
    this.set('_data', null);
  }
});
