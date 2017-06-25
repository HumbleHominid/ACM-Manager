import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('contact-us-modal', 'Integration | Component | contact us modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{contact-us-modal}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), '× Contact Us First Name Last Name Your Email Your Message Send Reset Close');
});
