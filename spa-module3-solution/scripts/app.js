(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiSrvURL', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.title = "Narrow Down Your Chinese Menu Choice";
        menu.searchKey = "";

        // call service
        // on filter button click
        menu.getMatchedMenuItems = function () {
            menu.categories =  MenuSearchService.getMatchedMenuItems(menu.searchKey);
        }

       // remove item on click item remove
        menu.removeItem = function (itemIndex) {
            menu.categories = MenuSearchService.removeItem(itemIndex);
        }
    }


    MenuSearchService.$inject = ['$http', 'ApiSrvURL'];
    function MenuSearchService($http, ApiSrvURL) {
        var service = this;

        // List of shopping items
        var items = [];

        service.getMatchedMenuItems = function (searchTerm) {
            items = [];

            // declare promise
            var promise = service.getMatchedMenu();

            // get items from service
            promise.then(function (response) {
                if (searchTerm != ""){
                    for (var index = 0; index < response.data.length; index++) {
                        var name = response.data[index].name;

                        if (name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            items.push(response.data[index]);
                        }
                    }
               }
            })
            .catch(function (error) {
                console.log("Something went terribly wrong.");
            });


           return items;
        }

        service.getMatchedMenu = function () {
            var response = $http({ method: "GET", url: (ApiSrvURL + "/categories.json") });
            return response;
        };

        service.getMenuForCategory = function (shortName) {
            var response = $http({
                method: "GET",
                url: (ApiSrvURL + "/menu_items.json"),
                params: { category: shortName }
            });

            return response;
        };

        service.removeItem = function (itemIndex) {
          items.splice(itemIndex, 1);

          return items;
        };

        service.getItems = function () {
          return items;
        };

    }


    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'directives/foundItems.html',
        scope: {
          items: '<',
          myTitle: '@title',
          badRemove: '=',
          onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
      };

      return ddo;
    }


    function FoundItemsDirectiveController() {
      var list = this;

      list.cookiesInList = function () {
        for (var i = 0; i < list.items.length; i++) {
          var name = list.items[i].name;
          if (name.toLowerCase().indexOf("cookie") !== -1) {
            return true;
          }
        }

        return false;
      };
    }

})();
