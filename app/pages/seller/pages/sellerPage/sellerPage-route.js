angular.module('sellerPage.route', ['sellerPage.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home.sellerPage', {
            url:'/sellerPage',
            templateUrl: 'pages/seller/pages/sellerPage/sellerPage.html',
            controller:'SellerPageController'
        })
    }])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('pianPage', {
            url:'/pianPage',
            templateUrl: 'pages/seller/pages/sellerPage/pianPage/pianPage.html',
            controller:'PianController'
        })
    }])
;