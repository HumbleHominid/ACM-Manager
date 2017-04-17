import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-side-bar', 'Integration | Component | event side bar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{event-side-bar}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Upcomming Events Sort event preview by: Time Type');

  // Template block usage:
  this.render(hbs`
    {{#event-side-bar}}
      template block text
    {{/event-side-bar}}
  `);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), 'Upcomming Events Sort event preview by: Time Type template block text');
});
