import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo(),
  president: DS.belongsTo('member'),
  vicePresident: DS.belongsTo('member'),
  secretary: DS.belongsTo('member'),
  treasurer: DS.belongsTo('member')
});
