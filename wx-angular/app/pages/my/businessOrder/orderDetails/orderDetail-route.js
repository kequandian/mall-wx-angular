angular.module('businessOrderDetails.route', [/*'orderDetails.controller'*/])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('businessOrderDetails', {
            url:         '/businessOrderDetails/:orderNumber',
            templateUrl: 'pages/my/businessOrder/orderDetails/orderDetail.html',
            controller:'BusinessOrderDetailsController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('BusinessOrderDetails');
                }]
            }
        })
}]);