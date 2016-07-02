angular.module('my.order.route', [/*'my.order.controller'*/])
    .config(function($stateProvider, $urlRouterProvider){

    //$urlRouterProvider.when("/order", "/order/all");
    $stateProvider
        .state('order', {
            url: "/order",
            templateUrl: "pages/my/order/order.html",
            controller: 'OrderController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Order');
                }]
            }
        })
        .state('order.all', {
            url: "/all",
            templateUrl: "pages/my/order/tabs/all.html",
            controller:'allController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Order');
                }]
            }
        })
        .state('order.pay', {
            url: "/pay",
            templateUrl: "pages/my/order/tabs/pay.html",
            controller:'payController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Order');
                }]
            }
        })
        .state('order.payed', {
            url: "/payed",
            templateUrl: "pages/my/order/tabs/payed.html",
            controller:'payedController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Order');
                }]
            }
        })
        .state('order.delivered', {
            url: "/delivered",
            templateUrl: "pages/my/order/tabs/delivered.html",
            controller:'deliveredController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Order');
                }]
            }
        })
        .state('order.finish', {
            url: "/finish",
            templateUrl: "pages/my/order/tabs/finish.html",
            controller:'finishController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Order');
                }]
            }
        })
});