(function () {
    "use strict";

    angular.module('public')
    .controller('MyInfoController', MyInfoController);
     
    MyInfoController.$inject = ['$scope', 'sharedContext' ];
    function MyInfoController($scope, sharedContext) {
        var $ctrl = this; 
        $ctrl.user = sharedContext.loginUser; 
    }
     

})();
