'use strict';

// Declare app level module which depends on views, and components
var myapp = angular.module('myapp', [
    'global',
    'bsSwitch',
    //'materialDatePicker',
    'modelValues',
    'commonJs',
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
    "salesReturn.route"
]);

myapp.filter('NotNull', function(){
        return function(input){
            if(!angular.isDefined(input)){
                return 0;
            }

            if(input==null){
                return 0;
            }

            return input;
        }
    });


myapp.config(['$stateProvider', "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/home/homePage");
}]);

myapp.directive('cityPicker', function() {
        return function(scope, element, attrs) {
            //console.log('work');
            element.cityPicker({
                onSelect: function(dateText) {
                    var modelPath = $(this).attr('ng-model');
                    putObject(modelPath, scope, dateText);
                    scope.$apply();
                }
            });
        }
    })


    //截取文字长度过滤器
    .filter('cutText', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || '…');
        };
    })

    //解析含html的字符串
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }])

.directive('updateTitle', ['$rootScope', '$timeout',
    function($rootScope, $timeout) {
        return {
            link: function(scope, element) {

                var listener = function(event, toState) {

                    var title = 'Default Title';
                    if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

                    $timeout(function() {
                        element.text(title);
                    }, 0, false);
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
])


;





// 娣诲姞 directive
//myapp.directive("myDir", function() {
//    return {
//        restrict: "E",
//        scope: {
//            name: "@",   // name 鍊间紶閫� 锛堝瓧绗︿覆锛屽崟鍚戠粦瀹氾級
//            amount: "=", // amount 寮曠敤浼犻�掞紙鍙屽悜缁戝畾锛�
//            save: "&"    // 淇濆瓨鎿嶄綔
//        },
//        template:
//        "<div>" +
//        "  {{name}}: <input ng-model='amount' />" +
//        "  <button ng-click='save()'>淇濆瓨</button>" +
//        "</div>",
//        replace: true,
//        transclude: false,
//        link: function (scope, element, attrs) {
//
//            console.log("initial value for name:" + scope.name);
//            console.log("initial value for amount:" + scope.amount);
//
//            element.css("background", "yellow");
//
//            scope.$watch("amount", function (newVal, oldVal) {
//                alert("amount has changed " + oldVal + " >> " + newVal);
//            });
//
//
//            scope.$watch("name", function (newVal, oldVal) {
//                console.log("name has changed " + oldVal + " >> " + newVal);
//            });
//        }
//    }
//});