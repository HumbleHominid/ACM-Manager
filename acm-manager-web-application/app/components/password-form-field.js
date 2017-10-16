import Ember from 'ember';
import FormOptions from '../mixins/form-options';

export default Ember.Component.extend(FormOptions, {
  placeholder: "Password",
  formName: "password",
  pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$",
  help: "One lowercase, one uppercase, one number, and 8 character minimum",
  label: "Password"
});
