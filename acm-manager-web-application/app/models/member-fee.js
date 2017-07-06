import DS from 'ember-data';

export default DS.Model.extend({
  fee: DS.belongsTo(),
  additionalInfo: DS.attr('string'),
  paid: DS.attr('boolean')
});
