angular.module('sellerPage.route', [/*'sellerPage.controller'*/])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home.sellerPage', {
            url:'/sellerPage',
            templateUrl: 'pages/seller/pages/sellerPage/sellerPage.html',
            controller:'SellerPageController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('SellerPage');
                }]
            }
        })
    }])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home.becomeDistributor', {
            url:'/becomeDistributor',
            templateUrl: 'pages/seller/pages/distributionInfo/distributionInfo.html',
            controller:'becomeDistributorController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('becomeDistributor');
                }]
            }
        })
    }])
    /*.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('pianPage', {
            url:'/pianPage',
            templateUrl: 'pages/seller/pages/sellerPage/pianPage/pianPage.html',
            controller:'PianController'
        })
    }])*/
;