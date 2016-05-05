angular.module('orderDetails.route', ['orderDetails.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('orderDetails', {
            url:         '/orderDetails',
            templateUrl: 'pages/my/order/orderDetails/orderDetail.html',
            controller:'OrderDetailsController'
        })
}]);