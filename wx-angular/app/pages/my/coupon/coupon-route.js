angular.module('coupon.route', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('coupon', {
            url: '/coupon',
            templateUrl: 'pages/my/coupon/coupon.html',
            controller:'CouponController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Coupon');
                }]
            }
        })
}]);