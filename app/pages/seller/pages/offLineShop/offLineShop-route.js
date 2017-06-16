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

            /*
             * 结算明细
             * */
            .state('settlementRecord', {
            url:'/settlementRecord',
            templateUrl: 'pages/seller/pages/offLineShop/seller/settlementRecord.html',
            controller:'SettlementRecordController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('SettlementRecord');
                }]
            }
        })

            /*
            * 经销授权nav
            * */
            .state('authorizationPage', {
            url:'/authorizationPage',
            templateUrl: 'pages/seller/pages/offLineShop/seller/sellerAuthorization/authorizationPage.html',
            controller:'AuthorizationPageController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('OffLine');
                }]
            }
        })

            /*
             * 皇冠经销授权
             * */
            .state('crownSellerAuthentication', {
                url:'/crownSellerAuthentication/:levelStatus/:isMe',
                templateUrl: 'pages/seller/pages/offLineShop/seller/sellerAuthorization/crownSellerAuthentication.html',
                controller:'CrownSellerAuthenticationController',
                resolve: {
                    loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('SellerAuthorization');
                    }]
                }
            })

            /*
             * 我的推荐--返点比例对照表
             * */
            .state('lookupTable', {
                url:'/lookupTable',
                templateUrl: 'pages/seller/pages/offLineShop/seller/sellerAuthorization/lookupTable.html',
                controller:'LookupTableController',
                resolve: {
                    loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('LookupTable');
                    }]
                }
            })

            /*
             * 我的推荐--查看明细
             * */
            .state('checkTableData', {
                url:'/checkTableData',
                templateUrl: 'pages/seller/pages/offLineShop/seller/sellerAuthorization/checkTableData.html',
                controller:'CheckTableDataController',
                resolve: {
                    loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('CheckTableData');
                    }]
                }
            })
    }]);