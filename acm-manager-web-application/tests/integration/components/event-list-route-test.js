import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-list-route', 'Integration | Component | event list route', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{event-list-route}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Click to Expand/Collapse');
});
