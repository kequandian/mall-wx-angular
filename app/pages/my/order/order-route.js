angular.module('my.order.route', ['my.order.controller'])
    .config(function($stateProvider, $urlRouterProvider){

    //$urlRouterProvider.when("/order", "/order/all");
    $stateProvider
        .state('order', {
            url: "/order",
            templateUrl: "pages/my/order/order.html",
            controller: 'OrderController'
        })
        .state('order.all', {
            url: "/all",
            templateUrl: "pages/my/order/tabs/all.html",
            controller:'allController'
        })
        .state('order.pay', {
            url: "/pay",
            templateUrl: "pages/my/order/tabs/pay.html",
            controller:'payController'
        })
        .state('order.payed', {
            url: "/payed",
            templateUrl: "pages/my/order/tabs/payed.html",
            controller:'payedController'
        })
        .state('order.delivered', {
            url: "/delivered",
            templateUrl: "pages/my/order/tabs/delivered.html",
            controller:'deliveredController'
        })
        .state('order.finish', {
            url: "/finish",
            templateUrl: "pages/my/order/tabs/finish.html",
            controller:'finishController'
        })
});