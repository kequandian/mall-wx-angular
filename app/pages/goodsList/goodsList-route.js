angular.module('goodsList.route', ['goodsList.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home.goodsList', {
            url: '/goodsList',
            templateUrl: 'pages/goodsList/goodsList.html',
            controller:'GoodsListController'
        })
}]);