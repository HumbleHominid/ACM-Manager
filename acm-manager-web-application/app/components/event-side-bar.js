import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    let el = this.$("#upcoming-events");
    let eventsHeight = el.outerHeight(true) - parseInt(el.css("marginBottom"));
    let panelBodyHeight = this.$(".panel-body").outerHeight(true);
    let panelHeadingHeight = this.$(".panel-heading").outerHeight(true);
    
    
    this.$(".list-group").css("height", eventsHeight - (panelBodyHeight + panelHeadingHeight));
    
    el.css("top", Ember.$("#navbar").outerHeight(true));
  }
});
