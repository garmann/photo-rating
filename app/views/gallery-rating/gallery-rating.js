angular.module('galleryRating', ['ngRoute', 'shooting-details']).

  controller('GalleryRatingController', ['$timeout', '$scope', '$http', '$routeParams', '$location', 'ShootingOverview', 'ShootingFactory', '$anchorScroll', function($timeout, $scope, $http, $routeParams, $location, ShootingOverview, ShootingFactory, $anchorScroll){

    var updateBackend = function(){
      ShootingFactory.update(
        {
          shootingid: $scope.ratingId,
          shooting: $scope.shootingdetail
        }
      );
    };

    $scope.ratingId = $routeParams.id;
    $scope.imagePath = "/res/images/" + $scope.ratingId + "/";
    $scope.newcommenttext = '';
    $scope.backendApiUrl = 'http://localhost:3001';

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


    // run this code if url containts position to jump to
    if($location.url().match(/#position-/)){
      var currentPath = $location.url();
      var positionOfJumper = currentPath.indexOf('#position-');
      var postionJumpTo = currentPath.substr(positionOfJumper)

      $timeout(function(){
        $anchorScroll(postionJumpTo);
      }, 100);

    }


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

    $scope.addComment = function(index){
      $scope.newcomment = {};
      $scope.newcomment.text = this.newcommenttext;
      $scope.newcomment.author = 'tester@test.de';
      $scope.shootingdetail.photos[index].comments.push($scope.newcomment);
      this.newcommenttext = '';
      $scope.newcomment = {};
    };


  }]).

  directive('ngElevateZoom', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        //Will watch for changes on the attribute
        attrs.$observe('zoomImage',function(){
          linkElevateZoom();
        })

        function linkElevateZoom(){
          //Check if its not empty
          if (!attrs.zoomImage) return;
          element.attr('data-zoom-image',attrs.zoomImage);
          $(element).elevateZoom();
        }

        linkElevateZoom();

        scope.$on('$destroy', function(){
          $('.zoomContainer').remove();
        });

      }
    }
  })

;



