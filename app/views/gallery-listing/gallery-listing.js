angular.module('galleryListing', ['shooting-details']).
  controller('GalleryListingController', [ '$scope', 'ShootingOverview', 'ShootingFactory', function($scope, ShootingOverview, ShootingFactory){

    ShootingOverview.get(function(data){
      $scope.shootings = data.listings;
    });

  }]);