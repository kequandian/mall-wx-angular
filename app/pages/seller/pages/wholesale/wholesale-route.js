angular.module('wholesale.route', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('wholesale', {
            url:'/wholesale',
            templateUrl: 'pages/seller/pages/wholesale/wholesale.html',
            controller:'WholesaleController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Wholesale');
                }]
            }
        })
    }]);