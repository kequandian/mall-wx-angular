angular.module('wholesaleDetails.route', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('wholesaleDetails', {
            url:'/wholesaleDetails/:wholesaleId',
            templateUrl: 'pages/seller/pages/wholesale/pages/wholesaleDetails/wholesale-details.html',
            controller:'WholesaleDetailsController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('WholesaleDetails');
                }]
            }
        })
    }]);