import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('log-in-modal', 'Integration | Component | log in modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{log-in-modal}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), '× Log In Email Password Submit Reset Create Account Close');
});
