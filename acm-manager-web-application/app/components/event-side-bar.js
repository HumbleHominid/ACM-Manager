import Ember from 'ember';

export default Ember.Component.extend({
  data: { 
    past: null,
    future: null
  },
  filterTime: true,
  filterType: false,
  
  init() {
    this._super(...arguments);
    
    this.set('data.past', Ember.copy(this.get('eventData.past')));
    this.set('data.future', Ember.copy(this.get('eventData.future')));
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
    filterTime() {
      this.set('filterTime', true);
      this.set('filterType', false);
      
      this.set('data.past', Ember.copy(this.get('eventData.past')));
      this.set('data.future', Ember.copy(this.get('eventData.future')));
    },
    filterType() {
      this.set('filterType', true);
      this.set('filterTime', false);
      
      let data = { 
        past: { },
        future: { }
      };
      
      this.get('eventData.past').forEach(function(event) {
        if (event.eventType.event_type_id in data.past) {
          data.past[event.eventType.event_type_id].events.push(event);
        }
        else {
          data.past[event.eventType.event_type_id] = {
            name: event.eventType.name,
            events: [ ]
          };
          
          data.past[event.eventType.event_type_id].events.push(event);
        }
      }, this);
          
      this.get('eventData.future').forEach(function(event) {
        if (event.eventType.event_type_id in data.future) {
          data.future[event.eventType.event_type_id].events.push(event);
        }
        else {
          data.future[event.eventType.event_type_id] = {
            name: event.eventType.name,
            events: [ ]
          };
          
          data.future[event.eventType.event_type_id].events.push(event);
        }
      }, this);
      
      this.set('data', data);
    }
  }
});
