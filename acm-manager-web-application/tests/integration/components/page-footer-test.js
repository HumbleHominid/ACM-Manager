import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('page-footer', 'Integration | Component | page footer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{page-footer}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Michael Fryer and Trevor Brooks');
});
