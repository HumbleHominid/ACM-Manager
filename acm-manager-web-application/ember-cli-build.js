/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var bootstrap = require('bootstrap');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });
  
  app.import(bootstrap);
  
  return app.toTree();
};
