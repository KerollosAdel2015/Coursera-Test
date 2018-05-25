(function () {
    "use strict";
    /**
     * Public restaurant application. Includes the common module and ui-router.
     */
    angular.module('public', ['ui.router', 'common'])
       .factory("sharedContext", function () {
           var loginUser = null;
             
           return {
               loginUser: loginUser
           }
       }); 

})();
