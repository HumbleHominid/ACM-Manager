import Ember from 'ember';
import FormOptions from '../mixins/form-options';

export default Ember.Component.extend(FormOptions, {
  placeholder: "Email",
  pattern: "^.+@mtech\.edu$",
  formName: "email",
  label: "Email"
});
