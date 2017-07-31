import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  "use strict";
  
  this.route('home');
  this.route('account', { qureyParams: [ "user_id" ] });
  this.route('events');
  this.route('files');
  this.route('officers');
  this.route('fees');
});

export default Router;
