angular.module('seller.route', [
]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home.seller', {
        url:         '/seller',
        templateUrl: 'pages/seller/seller.html'
    })
}]);