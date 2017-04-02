angular.module('navigation', []).
  component('navigation', {
    templateUrl: 'components/navigation/navigation.html',
    controller: function($scope, $routeParams, $location){

      $scope.backendApiUrl = 'http://localhost:3001';

      $scope.shootingid = $routeParams.id;
      $scope.currentpage = $location.path();

      if($scope.currentpage.match(/gallery-overview-rating/)){
        $scope.themeswitchto = '#!/gallery-rating' + '/'+ $scope.shootingid;
        $scope.valuengshow = 'gallery-overview-rating';
      } else if ($scope.currentpage.match(/gallery-rating/)) {
        $scope.themeswitchto = '#!/gallery-overview-rating' + '/'+ $scope.shootingid;
        $scope.valuengshow = 'gallery-rating';
      } else {
        $scope.themeswitchto = '';
        $scope.valuengshow = '';
      }



    }
  });