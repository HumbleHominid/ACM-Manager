import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ "jumbotron" ],
  headerClass: "",
  paragraphClass: "",
  title: "",
  
  didRender() {
    if (parseInt(Ember.$(window).width()) > 1225) {
      let el = Ember.$("#" + this.elementId);
      let sidebar = Ember.$("#upcoming-events");
      
      el.css("marginRight", parseInt(sidebar.css("right")) + sidebar.outerWidth(true) + parseInt(el.css("marginLeft")));
    }  
  }
});
