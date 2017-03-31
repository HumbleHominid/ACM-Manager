
import { isActiveRoute } from 'acm-manager-web-application/helpers/is-active-route';
import { module, test } from 'qunit';

module('Unit | Helper | is active route');

// Replace this with your real tests.
test('apple apple', function(assert) {
  let result = isActiveRoute(['apple', 'apple']);
  assert.ok(result);
});

test('Apple apple', function(assert) {
  let result = isActiveRoute(['Apple', 'apple']);
  assert.ok(!result);
});

test('1 1', function(assert) {
  let result = isActiveRoute([1, 1]);
  assert.ok(result);
});