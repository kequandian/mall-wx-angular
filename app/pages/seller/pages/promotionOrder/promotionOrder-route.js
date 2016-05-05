angular.module('promotionOrder.route', ['promotionOrder.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('promotionOrder', {
            url:'/promotionOrder',
            templateUrl: 'pages/seller/pages/promotionOrder/promotionOrder.html',
            controller:'PromotionOrderController'
        })
    }]);