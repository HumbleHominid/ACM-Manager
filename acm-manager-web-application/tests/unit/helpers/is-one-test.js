
import { isOne } from 'acm-manager-web-application/helpers/is-one';
import { module, test } from 'qunit';

module('Unit | Helper | is one');

// Replace this with your real tests.
test('one', function(assert) {
  let result = isOne([1]);
  assert.ok(result);
});

test('two', function(assert) {
  let result = isOne([2]);
  assert.ok(result);
});

test('empty array', function(assert) {
  let result = isOne([[]]);
  assert.ok(!result);
});

test('one item array', function(assert) {
  let result = isOne([["t"]]);
  assert.ok(result);
});

test('two item array', function(assert) {
  let result = isOne([["t", "t"]]);
  assert.ok(!result);
});
