
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

test('apple Apple', function(assert) {
  let result = isActiveRoute(['apple', 'Apple']);
  assert.ok(!result);
});

test('Apple Apple', function(assert) {
  let result = isActiveRoute(['Apple', 'Apple']);
  assert.ok(result);
});

