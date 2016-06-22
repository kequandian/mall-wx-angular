/**
 * 申请退货
 *
 * @author Jimmie Hwang
 * @create 2016/6/16
 *
 */

angular.module("salesReturn.controller", ["salesReturn.service"])

    .controller("ReturnController", ["$scope", "$state", '$stateParams', "SalesReturnInfo", function ($scope, $state, $stateParams, SalesReturnInfo) {

        document.title = "申请退货";

        $scope.returnType = [
            {key: "请选择服务", value: "请选择服务"},
            {key: "RETURN", value: "退货退款"},
            {key: "REFUND", value: "仅退款"}
        ];

        /*$scope.returnReason = [
            {key: "请选择退货原因", value: "请选择退货原因"},
            {key: "大小尺寸与商品描述不符", value: "大小尺寸与商品描述不符"},
            {key: "卖家发错货", value: "卖家发错货"},
            {key: "尺码选错/不喜欢/效果差", value: "尺码选错/不喜欢/效果差"},
            {key: "假冒品牌", value: "假冒品牌"},
            {key: "颜色/款式/图案与描述不符", value: "颜色/款式/图案与描述不符"},
            {key: "收到商品少件或破损", value: "收到商品少件或破损"},
            {key: "材质/面料与商品描述不符", value: "材质/面料与商品描述不符"},
            {key: "质量问题", value: "质量问题"}
        ];*/

        /// get return reason
        getReturnCauses();

        //退货金额
        $scope.total_price = $stateParams.totalPrice;
        var s_r_status = $stateParams.SalesReturnStatus;
        if (s_r_status == 1) {
            $scope.returnType.key = 'REFUND';
        } else if (s_r_status == 2) {
            $scope.returnType.key = 'RETURN';
        }


        function getReturnCauses() {
            SalesReturnInfo.getReturnCauses()
                .then(function (json) {
                    if (json.status_code == 0) {
                        //$scope.returnReason = json.data;

                        var reasons = [{key: "请选择退货原因", value: "请选择退货原因"}];
                        angular.forEach(json.data, function(item){
                           reasons.push({key: item.name, value: item.name});
                        });

                        $scope.returnReason = reasons;

                        console.log("causes: "+ angular.toJson($scope.returnReason));
                    }
                }, function (error) {
                    $.toast("获取退货原因失败", "cancel");
                })
        }


        //提交退货信息
        $scope.postSalesReturn = function () {

            var order_number = $stateParams.orderNumber;
            var service_type = $scope.returnType.key;
            var reason = $scope.salesReturn.reason;
            var content = $scope.salesReturn.content;

            if (order_number == null) {
                $.toast("订单号出错", "cancel");
                return;
            }
            if ($scope.total_price == null) {
                $.toast("退货金额不正确", "cancel");
                return;
            }
            if (service_type == "请选择服务") {
                $.toast("请选择服务", "cancel");
                return;
            } else if (reason == "请选择退货原因") {
                $.toast("请选择退货原因", "cancel");
                return;
            }

            SalesReturnInfo.SalesReturnService(order_number, service_type, reason, content)
                .then(function (json) {
                    if (json.status_code == 0) {
                        //$scope.salesReturn = json.data;
                        $state.go('order.all')
                    }
                }, function (error) {
                    $.toast("提交信息失败", "cancel");
                })

        }

    }]);