angular.module('deliveredOrder.route', [/*'addressManager.controller'*/])
    //待收货
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('businessOrder.deliveredOrder', {
            url: "/deliveredOrder",
            templateUrl: "pages/my/businessOrder/tabs/deliveredOrder/delivered.html",
            controller:'DeliveredBusinessOrderController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('DeliveredOrder');
                }]
            }
        })

    }]);