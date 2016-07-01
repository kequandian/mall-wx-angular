(function () {
    'use strict';

    var myapp = angular.module('app', [
        'ui.router',
        'oc.lazyLoad',
        'global',
        'bsSwitch',
        'spinner',
        'commonJs',
        'moduleValueJs',
        'home.route',
        'homePage.route',
        //pages
        'my.route',
        'cart.route',
        'seller.route',
        'goodsList.route',
        'details.route',
        'addressManager.route',
        'orderDetails.route',
        'sellerPage.route',
        'myTeam.route',
        'promotionOrder.route',
        'marketing.route',
        'shopSettings.route',
        'category.route',
        'integral.route',
        'feedback.route',
        'commonProblem.route',
        'collection.route',
        'distributionInfo.route',
        'refund.route',
        'withdraw.route',
        "express.route",
        "salesReturn.route",
        'searchPage.route'
        //ocLazyLoad
        //'levelProgress',
        //'fiveStar'
    ]).config(["$urlRouterProvider", '$ocLazyLoadProvider',
        function ($urlRouterProvider, $ocLazyLoadProvider) {
            $urlRouterProvider.otherwise("/home/homePage");

            $ocLazyLoadProvider.config({
                modules: [{
                    name: 'FiveStar',
                    files: ['lib/custom/css/fiveStar.css', 'lib/custom/css/levelProgress.css', 'lib/custom/js/fiveStar.js', 'lib/custom/js/levelProgress.js'],
                    cache: true
                }, {
                    name: 'SquareImg',
                    files: ['lib/custom/js/squareImg.js'],
                    cache: true
                },{
                    name: 'GoodsListSvgBtn',
                    files: ['lib/goods-list-svg-btn/css/sortable-switch.css', 'lib/goods-list-svg-btn/js/sortableSwitch.js'],
                    cache: true
                }, {
                    name: 'Jquery',
                    files: ['bower_components/jquery/dist/jquery.min.js'],
                    cache: true
                }, {
                    name: 'JqueryWeUI',
                    files: ['bower_components/jquery-weui/dist/js/jquery-weui.min.js',
                        'js/weui.js',
                        {type: 'css', path: 'bower_components/jquery-weui/dist/css/jquery-weui.min.css'}],
                    cache: true
                }
                ]
            });
        }])

    myapp.run(['$ocLazyLoad', function ($ocLazyLoad) {
        angular.element(document).ready(function () {
            //document.getElementById('msg').innerHTML = 'Hello';
            //$ocLazyLoad.load('bower_components/angular-ui-router/release/angular-ui-router.min.js')

            /*$ocLazyLoad.load('bower_components/jquery/dist/jquery.min.js')
                .then(function () {
                    $ocLazyLoad.load([{type: 'css', path: 'bower_components/jquery-weui/dist/css/jquery-weui.min.css'},
                        'bower_components/jquery-weui/dist/js/jquery-weui.min.js',
                        'js/weui.js'
                    ]).then(function () {
                        console.log("loaded jquery");
                    })
                });*/
        });
    }]);

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
})();
