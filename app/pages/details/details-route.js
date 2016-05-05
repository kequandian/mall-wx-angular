angular.module('details.route', ['details.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('details', {
            url: '/details/:productId',
            templateUrl: 'pages/details/details.html',
            controller:'DetailsController'
        })
    }]);