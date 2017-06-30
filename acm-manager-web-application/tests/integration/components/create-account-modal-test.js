import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('create-account-modal', 'Integration | Component | create account modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{create-account-modal}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), '× Create Account First Name Last Name Email Confirm Email Password Confirm Password Submit Reset Close');
});
