angular.module('searchPage.route', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('searchPage', {
            url: '/searchPage',
            templateUrl: 'pages/searchPage/searchPage.html',
            controller:'SearchPageController',
            resolve: {
                loadGoodsList: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Search');
                }]
            }
        })
    }]);