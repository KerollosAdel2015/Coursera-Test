(function () {
    "use strict";

    angular.module('common')
    .factory('MenuFactory', MenuFactory);



    function MenuFactory() {
        var factory = this;
        var context = [];


        factory.addData = function (key, value) {
            var data = {
                key: key,
                value: value
            };
            context.push(data);
        }

        factory.getData = function (key) {
            var data = _.find(context, {
                key: key
            });
            return data;
        }

        return {
            addData: addData,
            getData: getData
        }

    }



})();

