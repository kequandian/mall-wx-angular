angular.module('searchPage.route', ['searchPage.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('searchPage', {
            url: '/searchPage',
            templateUrl: 'pages/searchPage/searchPage.html',
            controller:'SearchPageController'
        })
    }]);