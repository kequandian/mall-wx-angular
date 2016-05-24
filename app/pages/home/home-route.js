angular.module('home.route', ['home.controller'])
    .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
        url:'/home',
        templateUrl: 'pages/home/home.html',
        controller:'HomeController'
    })
}]);