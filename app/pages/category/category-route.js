angular.module('category.route', ['category.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home.category', {
            url: '/category',
            templateUrl: 'pages/category/category.html',
            controller:'CategoryController'
        })
    }]);