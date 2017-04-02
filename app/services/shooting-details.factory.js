angular.module('shooting-details', ['ngResource']).

  factory('ShootingFactory', ['$resource', function($resource){

    return $resource('http://localhost:3001/listing/:shootingid', {shootingid: '@shootingid'}, {
      get: {
        method: 'GET'
      },
      update: {
        method: 'PUT'
      },
      remove: {
        method: 'DELETE'
      },
      create: {
        method: 'POST'
      }

    });
  }]).


  factory('ShootingOverview', ['$resource', function($resource){
    return $resource('http://localhost:3001/listing-overview', {}, {
      get: {
        method: 'GET'
      }
    });
  }])


;