import Ember from 'ember';
import FormOptionsMixin from 'acm-manager-web-application/mixins/form-options';
import { module, test } from 'qunit';

module('Unit | Mixin | form options');

// Replace this with your real tests.
test('it works', function(assert) {
  let FormOptionsObject = Ember.Object.extend(FormOptionsMixin);
  let subject = FormOptionsObject.create();
  assert.ok(subject);
});
