import DS from 'ember-data';

export default DS.Model.extend({
  jwt: DS.attr('string')
});
