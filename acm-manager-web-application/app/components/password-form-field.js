import GenericForm from './generic-form-field';

export default GenericForm.extend({
  placeholder: "Password",
  formName: "password",
  pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}).*$",
  help: "One lowercase, one uppercase, one number, one special character (!@#$), and 8 character minimum"
});
