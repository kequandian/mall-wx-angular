angular.module('businessOrder.route', [/*'addressManager.controller'*/])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('businessOrder', {
            url: '/businessOrder',
            templateUrl: 'pages/my/businessOrder/businessOrder.html',
            controller: 'BusinessOrderController'
            ,resolve: {
                loadGoodsList: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('BusinessOrderRecord');
                }]
            }
        })

    }]);