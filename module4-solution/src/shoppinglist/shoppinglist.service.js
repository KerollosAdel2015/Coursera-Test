(function () {
    'use strict';

    angular.module('MainApp')
    .service('ShoppingListService', ShoppingListService) ;


    ShoppingListService.$inject = ['$http', '$q', '$timeout']
    function ShoppingListService($http,$q, $timeout) {
        var service = this;

        // List of shopping items
        var items = [];
        var sub_items = [];

        // push items from API in array
        service.pushMenuItems = function () {
            items = [];

            // declare promise
            var promise = service.GetMenu();
            
            // get items from service
            promise.then(function (response) { 
                for (var index = 0; index < response.data.length; index++) {
                    items.push(response.data[index]);
                }
            })
            .catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        }
        // get category from API
        service.GetMenu = function () { 
            var response = $http({ method: 'GET', url: 'https://davids-restaurant.herokuapp.com/categories.json' })
            return response;
        };


        // push items from API in array
        service.pushItems = function (categoryShortName) {
            sub_items = [];

            // declare promise
            var promise = service.GetItems(categoryShortName);
            
            // get items from service
            promise.then(function (response) { 
                for (var index = 0; index < response.data.menu_items.length; index++) {
                    sub_items.push(response.data.menu_items[index]);
                }
            })
            .catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        }
        // get category from API
        service.GetItems = function (categoryShortName) { 
            var response = $http({ method: 'GET', url: 'https://davids-restaurant.herokuapp.com/menu_items.json', params: { category: categoryShortName } }) 
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


        // Simulates call to server
        // Returns a promise, NOT items array directly
        service.getSubItems = function (categoryShortName) {
            service.pushItems(categoryShortName);

            var deferred = $q.defer();
            
            // Wait 2 seconds before returning
            $timeout(function () {
                // deferred.reject(items);
                deferred.resolve(sub_items);
            }, 800);

            return deferred.promise;
        };

        
    }

})();
