import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('password-form-field', 'Integration | Component | password form field', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{password-form-field}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), '');
});
