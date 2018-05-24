(function () {
    'use strict';

    angular.module('MainApp')
    .controller('ItemDetailController', ItemDetailController);

    // 'item' is injected through state's resolve
    ItemDetailController.$inject = ['item']
    function ItemDetailController(item) {
        var itemDetail = this;

        if (item) {
            itemDetail.id = item.id;
            itemDetail.name = item.name;
            itemDetail.short_name = item.short_name;
            itemDetail.description = item.description;
            itemDetail.price_small = item.price_small;
            itemDetail.price_large = item.price_large;
            itemDetail.small_portion_name = item.small_portion_name;
            itemDetail.large_portion_name = item.large_portion_name;
        } 
      
    }

})(); 