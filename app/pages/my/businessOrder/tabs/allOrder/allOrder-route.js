angular.module('allOrder.route', [/*'addressManager.controller'*/])
    //全部订单
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('businessOrder.allOrder', {
            url: "/allOrder",
            templateUrl: "pages/my/businessOrder/tabs/allOrder/all.html",
            controller:'AllBusinessOrderController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('AllOrder');
                }]
            }
        })

    }]);