import Ember from 'ember';
import FormOptions from '../mixins/form-options';

export default Ember.Component.extend(FormOptions, {
  placeholder: "Textarea",
  formName: "textarea",
  label: "Textarea"
});
