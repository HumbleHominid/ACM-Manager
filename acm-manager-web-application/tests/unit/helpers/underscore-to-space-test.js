
import { underscoreToSpace } from 'acm-manager-web-application/helpers/underscore-to-space';
import { module, test } from 'qunit';

module('Unit | Helper | underscore to space');

// Replace this with your real tests.
test('it_works', function(assert) {
  let result = underscoreToSpace(['it_works']);
  assert.ok(result === 'it works');
});

test('_it_works', function(assert) {
  let result = underscoreToSpace(['_it_works']);
  assert.ok(result === ' it works');
});

test('it works_', function(assert) {
  let result = underscoreToSpace(['it works_']);
  assert.ok(result === 'it works ');
});

test('_it works_', function(assert) {
  let result = underscoreToSpace(['_it works_']);
  assert.ok(result === ' it works ');
});

