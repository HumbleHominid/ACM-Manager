import Ember from 'ember';
import FormOptions from '../mixins/form-options';

export default Ember.Component.extend(FormOptions, {
  placeholder: "Select",
  formName: "select",
  label: "Select",
  
  multiple: false,
  data: null
});
