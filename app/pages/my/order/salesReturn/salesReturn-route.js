/**
 * 申请退货
 *
 * @author Jimmie Hwang
 * @create 2016/6/16
 *
 */

angular.module("salesReturn.route", ["salesReturn.controller"])

    .config(["$stateProvider", function($stateProvider) {
        $stateProvider.state("salesReturn", {
            url: "/salesReturn",
            templateUrl:"pages/my/order/salesReturn/salesReturn.html",
            controller:"ReturnController",
            params:{
                'orderNumber':null,
                'totalPrice':null,
                'SalesReturnStatus':0
            }
        })
    }]);