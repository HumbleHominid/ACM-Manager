import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nav-bar}}`);

  assert.equal(this.$().text().trim(), 'MTA\n\n\n\n      Home\n\n\n      Events\n\n\n      Contact Us\n\n\n\n        Files\n\n\n        Officers\n\n\n        Log Out\n\n\n        Logged in as Michael Fryer\n\n\n\n        Fees\n\n\n        Add User\n\n\n        Remove User');

  // Template block usage:
  this.render(hbs`
    {{#nav-bar}}
      template block text
    {{/nav-bar}}
  `);

  assert.equal(this.$().text().trim(), 'MTA\n\n\n\n      Home\n\n\n      Events\n\n\n      Contact Us\n\n\n\n        Files\n\n\n        Officers\n\n\n        Log Out\n\n\n        Logged in as Michael Fryer\n\n\n\n        Fees\n\n\n        Add User\n\n\n        Remove User');
});
