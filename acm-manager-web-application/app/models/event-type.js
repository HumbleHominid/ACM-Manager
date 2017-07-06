import DS from 'ember-data';

export default DS.Model.extend({
  event_type_id: DS.attr('number'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  defaultPoints: DS.attr('number')
});
