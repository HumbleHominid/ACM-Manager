import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo(),
  eventTypes: DS.hasMany('event-type'),
  eventData: DS.belongsTo('event-data')
});
