import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event-data', 'Unit | Model | event data', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
