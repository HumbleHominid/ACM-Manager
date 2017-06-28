import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('navbar-big', 'Integration | Component | navbar big', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{navbar-big}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#navbar-big}}
      template block text
    {{/navbar-big}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
