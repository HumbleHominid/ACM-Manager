import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('remove-user-modal', 'Integration | Component | remove user modal', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{remove-user-modal}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gi, ' '), '× Remove User Submit Reset Close');
});
