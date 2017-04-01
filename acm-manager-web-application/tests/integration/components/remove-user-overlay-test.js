import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('remove-user-overlay', 'Integration | Component | remove user overlay', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{remove-user-overlay}}`);

  assert.equal(this.$().text().trim(), 'Remove User Overlay\n\n\nSubmit\n\nCancel');

  // Template block usage:
  this.render(hbs`
    {{#remove-user-overlay}}
      template block text
    {{/remove-user-overlay}}
  `);

  assert.equal(this.$().text().trim(), 'Remove User Overlay\n\n\nSubmit\n\nCancel');
});
