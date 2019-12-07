angular.module('pieceGroupGoodsList.route', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pieceGroupGoodsList', {
            url: '/pieceGroupGoodsList',
            templateUrl: 'pages/goodsList/pieceGroupGoodsList/piece-group-goods-list.html',
            controller: 'PieceGroupGoodsListController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('PieceGroupGoodsList');
                }]
            }
        })
    }]);