import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('contact-us-overlay', 'Integration | Component | contact us overlay', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{contact-us-overlay}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Contact Us First Name Last Name Sender Email Message Send Cancel');
});
