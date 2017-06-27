import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ "jumbotron" ],
  headerClass: "",
  paragraphClass: "",
  title: "",
  
  didRender() {
    let el = Ember.$("#" + this.elementId);
    let sidebar = Ember.$("#upcoming-events");
    
    el.css("marginTop", Ember.$("#navbar").outerHeight(true));
    el.css("marginRight", parseInt(sidebar.css("right")) + sidebar.outerWidth(true) + parseInt(el.css("marginLeft")));
  }
});
