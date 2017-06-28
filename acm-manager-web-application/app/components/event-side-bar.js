import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    let el = this.$("#upcoming-events");
    
    if (Ember.$(document).width() <= 800) {
      el.addClass("upcoming-events__mobile");
    }
    else {
      el.addClass("upcoming-events__desktop");
    }
    
    let eventsHeight = el.outerHeight(true) - parseInt(el.css("marginBottom"));
    let panelBodyHeight = this.$(".panel-body").outerHeight(true);
    let panelHeadingHeight = this.$(".panel-heading").outerHeight(true);
    
    
    this.$(".upcoming-events-list").css("height", eventsHeight - (panelBodyHeight + panelHeadingHeight));
  }
});
