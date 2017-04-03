import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('l-name-form-field', 'Integration | Component | l name form field', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{l-name-form-field}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#l-name-form-field}}
      template block text
    {{/l-name-form-field}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
