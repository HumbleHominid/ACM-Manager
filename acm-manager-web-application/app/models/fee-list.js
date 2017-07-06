import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo(),
  feeTypes: DS.hasMany('fee-type'),
  debtors: DS.hasMany('debtor')
});
