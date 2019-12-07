angular.module('marketing.route', ['marketing.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('marketing', {
            url:'/marketing',
            templateUrl: 'pages/seller/pages/marketing/marketing.html',
            controller:'MarketingController'
        })
    }]);