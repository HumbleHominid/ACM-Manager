import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modal-buttons', 'Integration | Component | modal buttons', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{modal-buttons}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Submit Close');
});
