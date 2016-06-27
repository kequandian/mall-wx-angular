'use strict';

// Declare app level module which depends on views, and components
var myapp = angular.module('myapp', [
    'global',
    'bsSwitch',
    'spinner',
    'commonJs',
    'moduleValueJs',
    'ui.router',
    'home.route',
    'my.route',
    'cart.route',
    'seller.route',
    'homePage.route',
    'goodsList.route',
    'details.route',
    'addressManager.route',
    'orderDetails.route',
    //'coupon.route',
    'sellerPage.route',
    'myTeam.route',
    'promotionOrder.route',
    'marketing.route',
    'shopSettings.route',
    'category.route',
    //'userInfo.route',
    'integral.route',
    'feedback.route',
    //'commission.route',
    //'myAgent.route',
    'commonProblem.route',
    'collection.route',
    'distributionInfo.route',
    'refund.route',
    'withdraw.route',
    "express.route",
    "salesReturn.route",
    'searchPage.route',
    'levelProgress',
    'fiveStar'
]);

myapp.config(['$stateProvider', "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home/homePage");
    }])
;


/*myapp.directive('cityPicker', function () {
    return function (scope, element, attrs) {
        //console.log('work');
        element.cityPicker({
            onSelect: function (dateText) {
                var modelPath = $(this).attr('ng-model');
                putObject(modelPath, scope, dateText);
                scope.$apply();
            }
        });
    }
})*/

    /*.directive('updateTitle', ['$rootScope', '$timeout',
     function ($rootScope, $timeout) {
     return {
     link: function (scope, element) {

     var listener = function (event, toState) {

     var title = 'Default Title';
     if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

     $timeout(function () {
     element.text(title);
     }, 0, false);
     };

     $rootScope.$on('$stateChangeSuccess', listener);
     }
     };
     }
     ])*/

    /*.directive("myDir", function () {
     return {
     restrict: "E",
     scope: {
     name: "@",
     amount: "=",
     save: "&"
     },
     template: "<div>" +
     "  {{name}}: <input ng-model='amount' />" +
     "  <button ng-click='save()'>淇濆瓨</button>" +
     "</div>",
     replace: true,
     transclude: false,
     link: function (scope, element, attrs) {

     console.log("initial value for name:" + scope.name);
     console.log("initial value for amount:" + scope.amount);

     element.css("background", "yellow");

     scope.$watch("amount", function (newVal, oldVal) {
     alert("amount has changed " + oldVal + " >> " + newVal);
     });


     scope.$watch("name", function (newVal, oldVal) {
     console.log("name has changed " + oldVal + " >> " + newVal);
     });
     }
     }
     })*/
;
