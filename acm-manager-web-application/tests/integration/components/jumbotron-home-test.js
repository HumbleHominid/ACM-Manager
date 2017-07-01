import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jumbotron-home', 'Integration | Component | jumbotron home', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{jumbotron-home}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#jumbotron-home}}
      template block text
    {{/jumbotron-home}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
