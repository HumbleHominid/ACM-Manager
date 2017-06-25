import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["form-group", "has-feedback"],
  placeholder: "Textarea",
  idPrefix: "generic",
  value: "",
  
  didRender() {
    let el = this.$("#" + this.get('idPrefix') + "-textarea")[0];
    let div = Ember.$("#" + this.elementId);
    let span = this.$("#" + this.get('idPrefix') + "-textarea_span");
    
    if (el.validity.valid) {
      div.removeClass("has-warning has-error").addClass("has-success");
      span.removeClass("glyphicon-warning-sign glyphicon-remove").addClass("glyphicon-ok");
    }//if
    else if (!el.value && !el.validity.valid) {
      div.removeClass("has-error has-success").addClass("has-warning");
      span.removeClass("glyphicon-remove glyphicon-ok").addClass("glyphicon-warning-sign");
    }//else if
    else if (!el.validity.valid) {
      div.removeClass("has-warning has-success").addClass("has-error");
      span.removeClass("has-warning has-success").addClass("has-error");
    }//else if
  }
});
