import Ember from 'ember';

const { inject: { service } } = Ember; 

export default Ember.Component.extend({
  events: service(),
  
  filterTime: true,
  filterType: false,

  didRender() {
    let el = this.$(".upcoming-events-localized");
    let windowWidth = parseInt(Ember.$(window).width());
    let windowHeight = parseInt(Ember.$(window).height());

    let eventsHeight = (windowWidth < 1200 ? 300 : 125 + (windowHeight * 0.5)) - parseInt(el.css("marginBottom"));
    let panelBodyHeight = this.$(".panel-body").outerHeight(true);
    let panelHeadingHeight = this.$(".panel-heading").outerHeight(true);

    this.$(".upcoming-events-list").css("max-height", eventsHeight - (panelBodyHeight + panelHeadingHeight));
  },
  actions: {
    filterTime() {
      this.setProperties({
        filterTime: true,
        filterType: false
      });
    },
    filterType() {
      this.setProperties({
        filterTime: false,
        filterType: true
      });
    }
  }
});
