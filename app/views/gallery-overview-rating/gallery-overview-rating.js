angular.module('galleryOverviewRating', ['ngRoute', 'shooting-details']).
  controller('GalleryOverviewRatingController', ['$scope', '$http', '$routeParams', 'ShootingFactory', function($scope, $http, $routeParams, ShootingFactory){

    var updateBackend = function(){
      ShootingFactory.update(
        {
          shootingid: $scope.ratingId,
          shooting: $scope.shootingdetail
        }
      )
    };

    $scope.ratingId = $routeParams.id;
    $scope.imagePath = "/res/images/" + $scope.ratingId + "/";


    ShootingFactory.get({shootingid: $scope.ratingId}, function(data){
      $scope.shootingdetail = data.shooting;
    });


    $scope.watchcounter = 0;
    $scope.$watch('shootingdetail', function(){
      $scope.watchcounter++;

      if($scope.watchcounter > 2){
        /*
          counting how many times the watch event was fired. during variable desclaration and filling from json api, watch will fire 2 times for $scope.shootingdetail

          only after 2 times, i want to call the updateBackend function, otherwise it would fire during initialisation
        */
        updateBackend();
      }

      // third argument is true to compare complex arguments (objects > shootingdetail) with $watch
    }, true);


    $scope.toggleTrash = function(index){
      $scope.shootingdetail.photos[index].trash = !$scope.shootingdetail.photos[index].trash;
    };

    $scope.toggleThumbs = function(index){
      $scope.shootingdetail.photos[index].thumbs = !$scope.shootingdetail.photos[index].thumbs;
    };

    $scope.setTrash = function(index, value){
      $scope.shootingdetail.photos[index].trash = value;
    };

    $scope.setThumbs = function(index, value){
      $scope.shootingdetail.photos[index].thumbs = value;
    };

    $scope.setRating = function(index, rating){
      if ($scope.shootingdetail.photos[index].rating == rating) {
        $scope.shootingdetail.photos[index].rating = 0;
      } else {
        $scope.shootingdetail.photos[index].rating = rating;
      }
    };


  }]);