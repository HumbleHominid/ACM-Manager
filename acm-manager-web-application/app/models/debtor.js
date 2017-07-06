import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('member'),
  fees: DS.hasMany('member-fee')
});
