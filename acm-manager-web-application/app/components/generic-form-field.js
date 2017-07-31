import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["form-group"],
  classNameBindings: ["hasFeedback:has-feedback"],
  idPrefix: "generic",
  placeholder: "",
  value: "",
  required: true,
  help: "",
  pattern: ".+",
  formName: "",
  hasFeedback: true,
  
  makeValid: function(div, span) {
    "use strict";
    
    div.removeClass("has-warning has-error").addClass("has-success");
    span.removeClass("glyphicon-warning-sign glyphicon-remove").addClass("glyphicon-ok");
  },
  makeWarning: function(div, span) {
    "use strict";
    
    div.removeClass("has-error has-success").addClass("has-warning");
    span.removeClass("glyphicon-remove glyphicon-ok").addClass("glyphicon-warning-sign");
  },
  makeError: function(div, span) {
    "use strict";
    
    div.removeClass("has-warning has-success").addClass("has-error");
    span.removeClass("glyphicon-warning-sign glyphicon-ok").addClass("glyphicon-remove");
  },
  
  didRender() {
    "use strict";
    
    if (!this.get('hasFeedback')) {
      return;
    }
    
    let el = this.$("#" + this.get('idPrefix') + "-" + this.get('formName'))[0];
    let div = Ember.$("#" + this.elementId);
    let span = this.$("#" + this.get('idPrefix') + "-" + this.get('formName') + "_span");

    if (!el) {
      return;
    }
    
    if (el.validity.valid) {
      this.makeValid(div, span);
    }//if
    else if (!el.value && !el.validity.valid) {
      this.makeWarning(div, span);
    }//else if
    else if (!el.validity.valid) {
      this.makeError(div, span);
    }//else if
  }
});
