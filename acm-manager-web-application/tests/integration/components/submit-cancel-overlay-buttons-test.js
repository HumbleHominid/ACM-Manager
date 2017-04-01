import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('submit-cancel-overlay-buttons', 'Integration | Component | submit cancel overlay buttons', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{submit-cancel-overlay-buttons}}`);

  assert.equal(this.$().text().trim(), 'Submit\n\nCancel');

  // Template block usage:
  this.render(hbs`
    {{#submit-cancel-overlay-buttons}}
      template block text
    {{/submit-cancel-overlay-buttons}}
  `);

  assert.equal(this.$().text().trim(), 'Submit\n\nCancel');
});
