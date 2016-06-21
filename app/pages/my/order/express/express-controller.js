/**
 * 物流详情
 *
 * @author Jimmie Hwang
 * @create 2016/6/15
 *
 */

angular.module("express.controller", ["express.service"])
    //订单物流状态
    .filter("expressStatus", function(){
        return function(input){
            if(input == "ok"){
                return "已签收";
            }
            else {
                return "派件中";
            }
        }
    })
    .controller("ExpressController", ["$scope", "$state", '$stateParams', "ExpressInfo",
        function ($scope, $state, $stateParams, ExpressInfo) {
            document.title = "物流详情";

            getExpressInfo();
            var expressStatus;
            //获取物流信息
            function getExpressInfo() {
                //9512852092104000000002
                var o_number = $stateParams.orderNumber;

                ExpressInfo.ExpressService(o_number)
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.expressInfo = json.data;

                            $scope.okclass = "trackList";
                        }

                    }, function (error) {
                        $.toast("获取信息失败", "cancel");
                    })

            }

        }]);