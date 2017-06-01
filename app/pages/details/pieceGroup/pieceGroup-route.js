angular.module('pieceGroup.route', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('piecegroup', {
            url: '/piecegroup/:pieceGroupId/:masterId',
            templateUrl: 'pages/details/pieceGroup/piece-group.html',
            controller:'PieceGroupController',
            resolve: {
                loadGoodsList: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('PieceGroup');
                }]
            }/*,
            params:{
                pieceGroupId:0,
                masterId:0
            }*/
        })
    }]);