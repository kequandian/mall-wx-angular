angular.module('payOrder.route', [/*'addressManager.controller'*/])
    //待付款
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('businessOrder.payOrder', {
            url: "/payOrder",
            templateUrl: "pages/my/businessOrder/tabs/payOrder/pay.html",
            controller:'PayBusinessOrderController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('PayOrder');
                }]
            }
        })

    }]);