angular.module('details.route', ['bsSwitch'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('details', {
            url: '/details/:productId?:fallback',
            templateUrl: 'pages/details/details.html',
            controller:'DetailsController',
            resolve: {
                loadGoodsList: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('Details');
                }]
            }
        })
    }]);