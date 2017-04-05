import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('abstract-overlay', 'Integration | Component | abstract overlay', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{abstract-overlay}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#abstract-overlay}}
      template block text
    {{/abstract-overlay}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
