import Ember from 'ember';

export default Ember.Component.extend({
  
  didRender() {
    let el = this.$("#upcoming-events");
    
    let eventsHeight = el.outerHeight(true) - parseInt(el.css("marginBottom"));
    let panelBodyHeight = this.$(".panel-body").outerHeight(true);
    let panelHeadingHeight = this.$(".panel-heading").outerHeight(true);
    

    this.$(".upcoming-events-list").css("height", this.get('eventsMaxHeight'));
  }
});
