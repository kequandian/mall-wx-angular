angular.module('refund.route', ['refund.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('refund', {
            url:         '/refund',
            templateUrl: 'pages/my/order/refund/refund.html',
            controller:'RefundController'
        })
    }]);