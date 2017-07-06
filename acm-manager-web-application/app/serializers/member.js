import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  primaryKey: "user_id"
});
