/**
 * 申请退货
 *
 * @author Jimmie Hwang
 * @create 2016/6/16
 *
 */

angular.module("salesReturn.route", [])
    .config(["$stateProvider", function($stateProvider) {
        $stateProvider.state("salesReturn", {
            url: "/salesReturn",
            templateUrl:"pages/my/order/salesReturn/salesReturn.html",
            controller:"ReturnController",
            resolve: {
                loadGoodsList: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('SalesReturn');
                }]
            },
            params:{
                'orderNumber':null,
                'totalPrice':null,
                'SalesReturnStatus':0
            }
        })
    }]);