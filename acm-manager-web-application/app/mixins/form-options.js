import Ember from 'ember';

export default Ember.Mixin.create({
  idPrefix: "generic",
  placeholder: "",
  value: "",
  required: true,
  help: "",
  pattern: ".+",
  formName: "",
  hasFeedback: true,
  label: "",
  type: "text",
  min: null,
  max: null,
  step: 1,
});
