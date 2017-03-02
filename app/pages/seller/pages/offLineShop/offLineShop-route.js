angular.module('offLineShop.route',[])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('offLineShop', {
            url:'/offLineShop',
            templateUrl: 'pages/seller/pages/offLineShop/offLineShop.html',
            controller:'OffLineShopController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('OffLine');
                }]
            }
        })
            .state('sellerTeam', {
            url:'/sellerTeam',
            templateUrl: 'pages/seller/pages/offLineShop/seller/sellerTeam.html',
            controller:'SellerTeamController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('SellerTeam');
                }]
            }
        })
            .state('sellerAuthorization', {
            url:'/sellerAuthorization',
            templateUrl: 'pages/seller/pages/offLineShop/seller/sellerAuthorization.html',
            controller:'SellerAuthorizationController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('SellerAuthorization');
                }]
            },
                params:{
                    isAgent:null
                }
        })
            .state('myRecommend', {
            url:'/myRecommend',
            templateUrl: 'pages/seller/pages/offLineShop/seller/myRecommend.html',
            controller:'MyRecommendController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('MyRecommend');
                }]
            }
        })
            .state('withdrawApply', {
            url:'/withdrawApply',
            templateUrl: 'pages/seller/pages/offLineShop/seller/withdrawApply.html',
            controller:'WithdrawApplyController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('SellerAuthorization');
                }]
            }
        })
            .state('offLineExchangeRecord', {
            url:'/offLineExchangeRecord',
            templateUrl: 'pages/seller/pages/offLineShop/seller/offLineExchangeRecord.html',
            controller:'OffLineExchangeRecordController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('OffLineExchangeRecord');
                }]
            }
        })
    }]);