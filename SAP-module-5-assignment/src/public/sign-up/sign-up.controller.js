(function () {
    "use strict";

    angular.module('public').controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope', 'sharedContext', 'SharedService', '$location'];
    function SignUpController($scope, sharedContext, SharedService, $location) {
        var $ctrl = this;
        $ctrl.dishErrorMessage = "";

        $ctrl.checkFavoriteDish = function () { 
             
            if ($ctrl.user.favoriteDishRef) {
                var promise = SharedService.getMenuItems($ctrl.user.favoriteDishRef);

                promise.then(function (data) {
                    if (data) { 
                        $ctrl.dishErrorMessage = "";
                        $ctrl.user.userDish = data;
                    } else { 
                        $ctrl.dishErrorMessage = "No such menu number exists";
                        $ctrl.user.userDish = data;
                    }
                });
            } else {
                $ctrl.user.userDish;
                $ctrl.dishErrorMessage = "";
            }

           
        }

        $ctrl.Registration = function () {
            if ($ctrl.user.userDish){
                $ctrl.user.userDish.imgName = $ctrl.user.userDish.short_name.replace(/\d+/g, '');
            } 
            sharedContext.loginUser = $ctrl.user;
            alert("Your information has been saved");
            $location.path("/home");

        };

    }


})();
;