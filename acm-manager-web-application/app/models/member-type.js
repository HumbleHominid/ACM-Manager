import DS from 'ember-data';

export default DS.Model.extend({
  user_type_id: DS.attr('number'),
  name: DS.attr('string'),
  description: DS.attr('string')
});
