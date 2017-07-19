import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nav-bar}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Toggle Navigation Home Events Officers Log In Create Account Contact Us × Log In Email Password Remember Me Submit Reset Create Account Close × Create Account First Name Last Name Email Confirm Email Password Confirm Password Submit Reset Close × Contact Us First Name Last Name Your Email Your Message Send Reset Close');
});

