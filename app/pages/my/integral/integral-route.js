angular.module('integral.route', ['integral.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('integral', {
                url:'/integral',
                templateUrl: 'pages/my/integral/integral.html',
                controller:'IntegralController'
            })
            .state('integralRule', {
                url: '/integralRule',
                templateUrl: 'pages/my/integral/pages/integral-rule.html',
                controller:'IntegralRuleController'
            });
    }]);