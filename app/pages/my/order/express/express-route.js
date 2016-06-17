/**
 * 物流详情
 *
 * @author Jimmie Hwang
 * @create 2016/6/15
 *
 */

angular.module("express.route", ["express.controller"])
    .config(["$stateProvider", function($stateProvider) {
        $stateProvider.state("express", {
            url: "/express",
            templateUrl: "pages/my/order/express/express.html",
            controller: "ExpressController"
        })
    }]);