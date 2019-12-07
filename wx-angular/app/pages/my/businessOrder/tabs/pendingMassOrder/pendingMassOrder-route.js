angular.module('pendingMassOrder.route', [/*'addressManager.controller'*/])
    //待付款
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('businessOrder.pendingMassOrder', {
            url: "/pendingMassOrder",
            templateUrl: "pages/my/businessOrder/tabs/pendingMassOrder/pending-mass.html",
            controller:'PendingMassBusinessOrderController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('PendingMassOrder');
                }]
            }
        })

    }]);