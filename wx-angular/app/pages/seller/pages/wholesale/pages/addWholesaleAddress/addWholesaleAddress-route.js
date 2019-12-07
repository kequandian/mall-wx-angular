angular.module('addWholesaleAddress.route', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('addWholesaleAddress', {
            url:'/addWholesaleAddress',
            templateUrl: 'pages/seller/pages/wholesale/pages/addWholesaleAddress/addWholesaleAddress.html',
            controller:'AddWholesaleAddressController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('AddWholesaleAddress');
                }]
            }
        })
    }]);