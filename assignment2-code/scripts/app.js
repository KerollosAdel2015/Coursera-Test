(function () {
'use strict';

angular.module('ShoppingListCheckOffApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var AlreadyBuy = this;
  AlreadyBuy.items = ShoppingListCheckOffService.GetAlreadyBoughtList();
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var ToBuyList = this;
    ToBuyList.items = ShoppingListCheckOffService.GetToBuyList();

    // Already bought items
    // remove item from to buy List
    // add item already bought list
    ToBuyList.AlreadyBought = function (itemIndex) {
      ShoppingListCheckOffService.AlreadyBought(itemIndex);
    };
}

function ShoppingListCheckOffService() {
  var service = this;
  var ToBuyList = [
      {  name: "Milk", quantity : "1" } ,
      {  name: "Donuts", quantity : "3" } ,
      {  name: "Cookies", quantity : "2" } ,
      {  name: "Chocolate", quantity : "1" } ,
      {  name: "Peanut Butter", quantity : "7" } ,
      {  name: "Pepto Bismol", quantity : "8" } ,
      {  name: "Pepto Bismol ( Chocolate flvore)", quantity : "10" } ,
      {  name: "Pepto Bismol ( Cookies flvore)", quantity : "5" }
    ];
  var AlreadyBoughtList = [];

  service.addItem = function (itemName, quantity) {
      var item = { name: itemName, quantity: quantity };
      AlreadyBoughtList.push(item);
  };

  service.AlreadyBought = function (itemIndex) {
      service.addItem(ToBuyList[itemIndex].name , ToBuyList[itemIndex].quantity)
      ToBuyList.splice(itemIndex, 1);
    };

  service.GetAlreadyBoughtList = function () { return AlreadyBoughtList;};
  service.GetToBuyList = function () { return ToBuyList;};
}

})();
