import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('quote-of-the-day', 'Integration | Component | quote of the day', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{quote-of-the-day}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Michael is the best. Michael Fryer in My Life');
});
