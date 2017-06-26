import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nav-bar}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Home Events Contact Us Log In × Log In Email Password Submit Reset Create Account Close × Create Account First Name Last Name Email Confirm Email Password Confirm Password Submit Reset Close × Contact Us First Name Last Name Your Email Your Message Send Reset Close × Add User First Name Last Name Email Confirm Email User\'s Password Make Password Please write down this password as it is unrecoverable after submit. Submit Reset Close × Remove User Submit Reset Close');
});

