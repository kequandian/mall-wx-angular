angular.module('distributionInfo.route', ['distributionInfo.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('distributionInfo', {
            url:'/distributionInfo',
            templateUrl: 'pages/seller/pages/distributionInfo/distributionInfo.html',
            controller:'DistributionInfoController'
        })
    }]);