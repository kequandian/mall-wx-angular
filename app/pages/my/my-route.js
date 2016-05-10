angular.module('my.route', [
    'my.controller',
    'my.order.route'
]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home.my', {
        url:         '/my',
        templateUrl: 'pages/my/my.html'
    })
    .state('about', {
        url:         '/about',
        templateUrl: 'pages/my/about/about.html'
    })
}]);