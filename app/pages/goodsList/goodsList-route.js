angular.module('goodsList.route', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('goodsList', {
            url: '/goodsList',
            templateUrl: 'pages/goodsList/goodsList.html',
            controller:'GoodsListController',
            resolve: {
                loadGoodsList: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('GoodsList');
                }]
            }
        })
}]);