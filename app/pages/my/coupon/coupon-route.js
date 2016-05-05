angular.module('coupon.route', ['coupon.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('coupon', {
            url: '/coupon',
            templateUrl: 'pages/my/coupon/coupon.html',
            controller:'CouponController'
        })
}]);