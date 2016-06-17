/**
 * 物流详情
 *
 * @author Jimmie Hwang
 * @create 2016/6/15
 *
 */

angular.module("express.controller", ["express.service"])

    .controller("ExpressController", ["$scope", "$state", "ExpressInfo", function($scope, $state, ExpressInfo) {
        document.title = "物流详情";

        getExpressInfo();
        var expressStatus;
        //获取物流信息
        function getExpressInfo() {

            ExpressInfo.ExpressService()
                .then(function (json) {
                    if(json.status_code == 0) {
                        $scope.expressInfo = json.data;

                    }
                    var expressStatus = $scope.expressInfo.message;

                    if(expressStatus == "ok"){
                        $scope.okclass = "trackList";
                    }

                },function (error) {
                    $.toast("获取信息失败", "cancel");
                })

        }
     
    }]);