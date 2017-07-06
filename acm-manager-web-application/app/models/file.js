import DS from 'ember-data';

export default DS.Model.extend({
  file_id: DS.attr('number'),
  uploader: DS.belongsTo('member'),
  audience: DS.attr('number'),
  fileName: DS.attr('string'),
  description: DS.attr('string')
});
