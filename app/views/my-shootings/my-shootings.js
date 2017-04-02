
angular.module('myShootings', ['shooting-details']).
  controller('MyShootingsController', [ '$scope', 'ShootingOverview', 'ShootingFactory', function($scope, ShootingOverview, ShootingFactory){

    ShootingOverview.get(function(data){
      $scope.listings = data.listings;
    });

    $scope.deleteShooting = function(index){
      if(confirm("sure to delete shooting with id:" + index)){
        ShootingFactory.remove({shootingid: index});
      }
    };

    $scope.toggleSelectMenuArray = {};
    $scope.toggleSelectMenu = function(index){
      if ($scope.toggleSelectMenuArray[index]) {
        $scope.toggleSelectMenuArray[index] = !$scope.toggleSelectMenuArray[index];
      } else {
        $scope.toggleSelectMenuArray[index] = true;
      }
    };

    $scope.ratings = [
            {option : "Approved", value : 1},
            {option : "3 Stars", value : 2},
            {option : "2 Stars and more", value : 3},
            {option : "1 Star and more", value : 4},
            {option : "Trash", value : 5}
        ];


    $scope.selectedItem ='';
    $scope.lightroomtext = {};
    $scope.selectedItemChanged = function(shootingindex, selectedItem){
      $scope.getRatingsFromShooting(shootingindex, selectedItem);

    }

    $scope.getRatingsFromShooting = function(shootingindex, selectedItem){

      var shootingdetail = {};
      var ret = [];

      ShootingFactory.get({shootingid: shootingindex}, function(data){
         shootingdetail = data.shooting;

         for (var i = 0; i < shootingdetail.photos.length; i++){

           if (selectedItem === 1 && shootingdetail.photos[i].thumbs === true){
             ret.push(shootingdetail.photos[i].name);
             continue;
           };

           if (selectedItem === 5 && shootingdetail.photos[i].trash === true){
             ret.push(shootingdetail.photos[i].name);
             continue;
           };

           if (selectedItem === 2 && shootingdetail.photos[i].rating >= 3){
             ret.push(shootingdetail.photos[i].name);
             continue;
           };

           if (selectedItem === 3 && shootingdetail.photos[i].rating >= 2){
             ret.push(shootingdetail.photos[i].name);
             continue;
           };

           if (selectedItem === 4 && shootingdetail.photos[i].rating >= 1){
             ret.push(shootingdetail.photos[i].name);
             continue;
           };
         }

        $scope.lightroomtext[shootingindex] = ret.toString().replace(/,/g, ", ");
      });

    }


  }]);