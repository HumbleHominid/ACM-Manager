import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content-area', 'Integration | Component | content area', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{content-area}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'MTA Home Events Contact Us Log In Fees Add User Remove User Upcomming Events © Michael Fryer and Trevor Brooks');

  // Template block usage:
  this.render(hbs`
    {{#content-area}}
      template block text
    {{/content-area}}
  `);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'MTA Home Events Contact Us Log In Fees Add User Remove User Upcomming Events template block text © Michael Fryer and Trevor Brooks');

});
