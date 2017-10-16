import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-list-item', 'Integration | Component | event list item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{event-list-item}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Name Type Location Date Time Points Expand/Collapse Coordinator , Additional Info Attendance');
});
