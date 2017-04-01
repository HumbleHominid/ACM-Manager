import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-user-overlay', 'Integration | Component | add user overlay', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{add-user-overlay}}`);

  assert.equal(this.$().text().trim(), 'Add User Overlay\n\n\nSubmit\n\nCancel');

  // Template block usage:
  this.render(hbs`
    {{#add-user-overlay}}
      template block text
    {{/add-user-overlay}}
  `);

  assert.equal(this.$().text().trim(), 'Add User Overlay\n\n\nSubmit\n\nCancel');
});
