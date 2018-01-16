angular.module('finishOrder.route', [/*'addressManager.controller'*/])
    //已完成
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('businessOrder.finishOrder', {
            url: "/finishOrder",
            templateUrl: "pages/my/businessOrder/tabs/finishOrder/finish.html",
            controller:'FinishBusinessOrderController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('FinishOrder');
                }]
            }
        })

    }]);