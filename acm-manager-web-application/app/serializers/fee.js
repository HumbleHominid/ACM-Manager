import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  primaryKey: "fee_id"
});
