import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-list-item-route', 'Integration | Component | event list item route', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{event-list-item-route}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Name Type Location Date Time Points Coordinator () Additional Info Attendance');
});
