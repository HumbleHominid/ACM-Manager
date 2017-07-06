import DS from 'ember-data';

export default DS.Model.extend({
  fName: DS.attr('string'),
  lName: DS.attr('string'),
  email: DS.attr('string'),
  user_id: DS.attr('number'),
  user_type: DS.belongsTo('member-type')
});
