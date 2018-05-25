(function () {
    "use strict";

    angular.module('public')
    .service('SharedService', SharedService);


    SharedService.$inject = ['$http', '$filter'];
    function SharedService($http, $filter) {
        var service = this;

        service.getMenuItems = function (search_key) {
            if (search_key == "") {
                return null;
            }

            return $http.get('https://sundeeprk-course5.herokuapp.com/menu_items.json').then(function (response) { 
                var selected = $filter('filter')(response.data.menu_items, { 'short_name': search_key });
                return selected[0];
            });
        }; 
    }



})();
