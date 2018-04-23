

(function(){
'use strict';

angular.module( 'LunchCheck' , [] )
.controller('LunchCheckController' ,LunchCheckController );

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
      $scope.Name = "";
      $scope.Message = "";
      $scope.messageBox = "";

      $scope.check = function () {
          // split string into array
          var array = $scope.Name.split(',');

          // remove all empty strings
          array = array.filter(word => word.trim().length > 0);

          // if there are no items in list
          if ( array.length == 0 ){
              $scope.Message ="Please enter data first";
              $scope.messageBox = {  "color" : "red" , "border-color" : "red", "border-style" : "solid" };
              return;
          }

          // change border if there are items
          $scope.messageBox = {  "color" : "green" , "border-color" : "green", "border-style" : "solid" };

          if ( array.length > 3 ){
              $scope.Message ="Too much!"; // less than 3
          }else {
              $scope.Message = "Enjoy!"; // more than 3
          }

      }

}
})();
