import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('contact-us-overlay', 'Integration | Component | contact us overlay', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{contact-us-overlay}}`);

  assert.equal(this.$().text().trim(), 'Contact Us Overlay\n\n\nSubmit\n\nCancel');

  // Template block usage:
  this.render(hbs`
    {{#contact-us-overlay}}
      template block text
    {{/contact-us-overlay}}
  `);

  assert.equal(this.$().text().trim(), 'Contact Us Overlay\n\n\nSubmit\n\nCancel');
});
