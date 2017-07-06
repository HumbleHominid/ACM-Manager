import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  event_id: DS.attr('number'),
  coordinator: DS.belongsTo('member'),
  eventType: DS.belongsTo('event-type'),
  name: DS.attr('string'),
  additionalInfo: DS.attr('string'),
  location: DS.attr('string'),
  eventTime: DS.attr('date'),
  points: DS.attr('number', {
    defaultValue() {
      return Ember.computed('eventType', function() {
        return this.get('eventType.defaultPoints');
      });
    }
  }),
  attendance: DS.belongsTo(),
  files: DS.hasMany('event-file')
});
