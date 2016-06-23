angular.module('goodsList.route', ['goodsList.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('goodsList', {
            url: '/goodsList',
            templateUrl: 'pages/goodsList/goodsList.html',
            controller:'GoodsListController',
            params:{
                'typeNumber':null,
                'searchStatus':null
            }
        })
}]);