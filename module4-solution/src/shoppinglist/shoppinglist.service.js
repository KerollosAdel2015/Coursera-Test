(function () {
    'use strict';

    angular.module('MainApp')
    .service('ShoppingListService', ShoppingListService) ;


    ShoppingListService.$inject = ['$http', '$q', '$timeout']
    function ShoppingListService($http,$q, $timeout) {
        var service = this;

        // List of shopping items
        var items = [];

        // push items from API in array
        service.pushMenuItems = function () {
            items = [];

            // declare promise
            var promise = service.GetMenu();

            // get items from service
            promise.then(function (response) {
                console.log("step 3");
                for (var index = 0; index < response.data.menu_items.length; index++) {
                    items.push(response.data.menu_items[index]);
                }
            })
            .catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        }

        // get category from API
        service.GetMenu = function () { 
            var response = $http({ method: 'GET', url: 'https://davids-restaurant.herokuapp.com/menu_items.json' }) 
            return response;
        };


        // Simulates call to server
        // Returns a promise, NOT items array directly
        service.getItems = function () {
            service.pushMenuItems();

            var deferred = $q.defer();

            // Wait 2 seconds before returning
            $timeout(function () {
                // deferred.reject(items);
                deferred.resolve(items);
            }, 800);

            return deferred.promise;
        };


        
    }

})();
