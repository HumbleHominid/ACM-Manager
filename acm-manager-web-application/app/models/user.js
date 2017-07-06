import DS from 'ember-data';
import Member from './member';

export default Member.extend({
  jwt: DS.belongsTo('token')
});
