import Ember from 'ember';

export default Ember.Component.extend({
  past: null,
  future: null,
  init() {
    this._super(...arguments);
    
    this.set('past', Ember.copy(this.get('eventData.past')));
    this.set('future', Ember.copy(this.get('eventData.future')));
  },
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
    
  }
});
