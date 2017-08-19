import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('announcement-object', 'Integration | Component | announcement object', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{announcement-object}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#announcement-object}}
      template block text
    {{/announcement-object}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
