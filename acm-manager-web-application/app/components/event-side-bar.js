import Ember from 'ember';

const { inject: { service }, $ } = Ember; 

export default Ember.Component.extend({
  events: service(),
  
  filterTime: true,
  filterType: false,

  didRender() {
    "use strict";
    
    let el = this.$(".upcoming-events-localized");
    let windowWidth = parseInt($(window).width());
    let windowHeight = parseInt($(window).height());

    let eventsHeight = (windowWidth < 1200 ? 300 : 125 + (windowHeight * 0.5)) - parseInt(el.css("marginBottom"));
    let panelBodyHeight = this.$(".panel-body").outerHeight(true);
    let panelHeadingHeight = this.$(".panel-heading").outerHeight(true);

    this.$(".events-list").css("max-height", eventsHeight - (panelBodyHeight + panelHeadingHeight));
  },
  actions: {
    filterTime() {
      "use strict";
      
      this.setProperties({
        filterTime: true,
        filterType: false
      });
    },
    filterType() {
      "use strict";
      
      this.setProperties({
        filterTime: false,
        filterType: true
      });
    }
  }
});
