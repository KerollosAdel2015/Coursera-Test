(function () {
    'use strict';

    angular.module('MainApp')
    .component('shoppingList', {
        templateUrl: 'src/shoppinglist/templates/shoppinglist.template.html',
        bindings: {
            items: '<'
        }
    });

})();
