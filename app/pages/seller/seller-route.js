angular.module('seller.route', [
    'seller.controller'
]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home.seller', {
        url:         '/seller',
        templateUrl: 'pages/seller/seller.html'
    })
}]);