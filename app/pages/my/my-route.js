angular.module('my.route', ['my.order.route', /*'my.controller'*/])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('home.my', {
            url: '/my',
            templateUrl: 'pages/my/my.html',
            controller: 'MyController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('My');
                }]
            }
        })
            .state('about', {
                url: '/about',
                templateUrl: 'pages/my/about/about.html'
            })
    }]);