angular.module('wholesaleGoodsList.route', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('wholesaleGoodsList', {
            url:'/wholesaleGoodsList',
            templateUrl: 'pages/seller/pages/wholesale/pages/wholesaleGoodsList/wholesale-goods-list.html',
            controller:'WholesaleGoodsListController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('WholesaleGoodsList');
                }]
            },
            params:{
                wholesalePCD:null
            }
        })
    }]);