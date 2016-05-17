angular.module('commission.route', ['commission.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('commission', {
            url:'/commission',
            templateUrl: 'pages/seller/pages/commission/commission.html',
            controller:'CommissionController'
        })
    }]);