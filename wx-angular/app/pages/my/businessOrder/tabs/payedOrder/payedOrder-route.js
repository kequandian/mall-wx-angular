angular.module('payedOrder.route', [/*'addressManager.controller'*/])
    //待发货
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('businessOrder.payedOrder', {
            url: "/payedOrder",
            templateUrl: "pages/my/businessOrder/tabs/payedOrder/payed.html",
            controller:'PayedBusinessOrderController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('PayedOrder');
                }]
            }
        })

    }]);