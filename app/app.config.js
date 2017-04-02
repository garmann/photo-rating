'use strict';

angular.module('photoRating')
  .config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.

        when('/gallery-listing', {
          controller: 'GalleryListingController',
          templateUrl: 'views/gallery-listing/gallery-listing.html'
        }).

        when('/gallery-overview-rating/:id', {
          controller: 'GalleryOverviewRatingController',
          templateUrl: 'views/gallery-overview-rating/gallery-overview-rating.html'
        }).

        when('/gallery-rating/:id', {
          controller: 'GalleryRatingController',
          templateUrl: 'views/gallery-rating/gallery-rating.html'
        }).

        when('/my-shootings', {
          controller: 'MyShootingsController',
          templateUrl: 'views/my-shootings/my-shootings.html'
        }).

        when('/my-projects-edit', {
          controller: 'MyProjectsEditController',
          templateUrl: 'views/my-projects-edit/my-projects-edit.html'
        }).
        otherwise('/gallery-listing')

    }

  ]);
