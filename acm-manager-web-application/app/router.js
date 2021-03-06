import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('account', { qureyParams: [ "user_id" ] });
  this.route('event_details');
  this.route('events');
  this.route('files');
  this.route('officers');
  this.route('fees');
});

export default Router;
