import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-item-event', 'Integration | Component | list item event', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{list-item-event}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Type Location Date Time Points Expand/Collapse Coordinator () Additional Info Attendance Files');
});
