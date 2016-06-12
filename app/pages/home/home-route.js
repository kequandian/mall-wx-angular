angular.module('home.route', ['home.controller'])
    .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
        url:'/home',
        cache:false,
        abstract: true,
        templateUrl: 'pages/home/home.html',
        controller:'HomeController'
    })
}]);