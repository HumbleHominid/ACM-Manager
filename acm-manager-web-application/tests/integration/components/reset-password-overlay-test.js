import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reset-password-overlay', 'Integration | Component | reset password overlay', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{reset-password-overlay}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Reset Password Enter account email. Email Submit Cancel');
});
