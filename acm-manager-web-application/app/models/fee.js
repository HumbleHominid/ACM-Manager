import DS from 'ember-data';

export default DS.Model.extend({
  fee_id: DS.attr('number'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  dueDate: DS.attr('date'),
  fee: DS.attr('number'),
  feeType: DS.belongsTo('fee-type')
});
