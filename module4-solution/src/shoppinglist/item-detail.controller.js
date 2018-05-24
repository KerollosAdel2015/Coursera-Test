(function () {
    'use strict';

    angular.module('MainApp')
    .controller('ItemDetailController', ItemDetailController);


    ItemDetailController.$inject = ['items', 'CategoryName'];
    function ItemDetailController(items, CategoryName) {
        var itemDetail = this;
        itemDetail.items = items;
        itemDetail.Name = CategoryName;

        console.log('s', CategoryName);
    }

})();
