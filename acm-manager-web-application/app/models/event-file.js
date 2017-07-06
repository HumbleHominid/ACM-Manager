import DS from 'ember-data';
import File from './file';

export default File.extend({
  addionalInfo: DS.attr('string')
});
