import DS from 'ember-data';

export default DS.Model.extend({
  past: DS.hasMany('event'),
  future: DS.hasMany('event')
});
