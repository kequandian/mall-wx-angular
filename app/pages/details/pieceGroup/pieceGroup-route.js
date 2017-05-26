angular.module('pieceGroup.route', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('pieceGroup', {
            url: '/pieceGroup/:pieceGroupId/:detailsFightGroupsStatus',
            templateUrl: 'pages/details/pieceGroup/piece-group.html',
            controller:'PieceGroupController',
            resolve: {
                loadGoodsList: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('PieceGroup');
                }]
            }
        })
    }]);