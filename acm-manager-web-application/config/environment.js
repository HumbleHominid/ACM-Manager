/* jshint node: true */
var fs = require('fs');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'acm-manager-web-application',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    APP: {
      endPoint: ""
    }
  };

  ENV['ember-simple-auth'] = {
    baseURL: 'home',
    authenticationRoute: 'home',
    routeAfterAuthentication: 'home',
    routeIfAlreadyAuthenticated: 'home'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    let config = JSON.parse(fs.readFileSync("vendor/config/config.json"));
  
    ENV.rootURL = config.rootURL;
    ENV.APP.endPoint = config.endPoint;
  }
  
  if (environment === 'mfryer') {
    let config = JSON.parse(fs.readFileSync("vendor/config/mfryer.json"));
    
    ENV.rootURL = config.rootURL;
    ENV.APP.endPoint = config.endPoint;
    
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  return ENV;
};
