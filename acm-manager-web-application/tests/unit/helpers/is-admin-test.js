
import { isAdmin } from 'acm-manager-web-application/helpers/is-admin';
import { module, test } from 'qunit';

module('Unit | Helper | is admin');

// Replace this with your real tests.
test('0', function(assert) {
  let result = isAdmin([0]);
  assert.ok(!result);
});

test('1', function(assert) {
  let result = isAdmin([1]);
  assert.ok(!result);
});

test('2', function(assert) {
  let result = isAdmin([2]);
  assert.ok(result);
});

