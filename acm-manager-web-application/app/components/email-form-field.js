import GenericForm from './generic-form-field';

export default GenericForm.extend({
  placeholder: "Email",
  pattern: "^.+@mtech\.edu$",
  formName: "email"
});
