(function () {
    'use strict';

    angular.module('MainApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
        .state('home', {
            url: '/',
            templateUrl: 'src/shoppinglist/templates/home.template.html'
        })

        // Premade list page
        .state('mainList', {
            url: '/main-list',
            templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
            controller: 'MainShoppingListController as mainList',
            resolve: {
                items: ['ShoppingListService', function (ShoppingListService) {
                    return ShoppingListService.getItems();
                }]
            }
        })

  .state('itemDetail', {
      url: '/item-detail/{categoryId}',
      templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
      controller: 'ItemDetailController as itemDetail',
      resolve: {
          items: ['$stateParams', 'ShoppingListService', function ($stateParams, ShoppingListService) {
              return ShoppingListService.getSubItems($stateParams.categoryId);
          }],
          CategoryName: ['$stateParams', 'ShoppingListService', function ($stateParams, ShoppingListService) { 
              return $stateParams.categoryId;
          }],
      }
  });

    }

})();

