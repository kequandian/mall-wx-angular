/**
 * 物流详情
 *
 * @author Jimmie Hwang
 * @create 2016/6/15
 *
 */

angular.module("express.route", [/*"express.controller"*/])
    .config(["$stateProvider", function($stateProvider) {
        $stateProvider.state("express", {
            url: "/express/:orderNumber",
            templateUrl: "pages/my/order/express/express.html",
            controller: "ExpressController",
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Express');
                }]
            },
            params:{
                orderNumber:null,
                productImg:null,
                productCount:null,
                expressNumber:null,
                expressCompany:null
            }
        })
    }]);