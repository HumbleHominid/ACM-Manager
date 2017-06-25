/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-bootstrap': {
      'bootstrapVersion': 3,
      'importBootstrapFont': true,
      'importBootstrapCSS': true
    }
  });
  
  app.import('vendor/bootstrap/affix.js');
  app.import('vendor/bootstrap/alert.js');
  app.import('vendor/bootstrap/button.js');
  app.import('vendor/bootstrap/carousel.js');
  app.import('vendor/bootstrap/collapse.js');
  app.import('vendor/bootstrap/dropdown.js');
  app.import('vendor/bootstrap/modal.js');
  
  //order matters
  app.import('vendor/bootstrap/tooltip.js');
  app.import('vendor/bootstrap/popover.js');
  
  app.import('vendor/bootstrap/scrollspy.js');
  app.import('vendor/bootstrap/tab.js');
  app.import('vendor/bootstrap/transition.js');
  
  return app.toTree();
};
