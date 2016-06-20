/**
 * 申请退货
 *
 * @author Jimmie Hwang
 * @create 2016/6/16
 *
 */

angular.module("salesReturn.controller", ["salesReturn.service"])

    .controller("ReturnController", ["$scope", "$state", "SalesReturnInfo", function($scope, $state, SalesReturnInfo) {
        
        document.title = "申请退货";

        $scope.returnType = [
            {key:"请选择服务", value:"请选择服务"},
            {key:"RETURN", value:"退货退款"},
            {key:"REFUND", value:"仅退款"}
        ];

        $scope.returnReason = [
            {key:"请选择退货原因",          value:"请选择退货原因"},
            {key:"大小尺寸与商品描述不符",   value:"大小尺寸与商品描述不符"},
            {key:"卖家发错货",              value:"卖家发错货"},
            {key:"尺码选错/不喜欢/效果差",   value:"尺码选错/不喜欢/效果差"},
            {key:"假冒品牌",                value:"假冒品牌"},
            {key:"颜色/款式/图案与描述不符", value:"颜色/款式/图案与描述不符"},
            {key:"收到商品少件或破损",       value:"收到商品少件或破损"},
            {key:"材质/面料与商品描述不符",  value:"材质/面料与商品描述不符"},
            {key:"质量问题",                value:"质量问题"}
        ];

        //提交退货信息
        $scope.postSalesReturn = function () {
            var order_number = "9659749838447727000002";
            var service_type = $scope.salesReturn.service_type;
            var reason       = $scope.salesReturn.reason;
            var content       = $scope.salesReturn.content;
            // console.log(service_type);
            // console.log(reason);

            if (service_type == "请选择服务") {
                $.toast("请选择服务", "cancel");
                return;
            } else if(reason == "请选择退货原因") {
                $.toast("请选择退货原因", "cancel");
                return;
            }

            SalesReturnInfo.SalesReturnService(order_number, service_type, reason, content)
                .then(function(json) {
                    if (json.status_code == 0) {
                        $scope.salesReturn = json.data;
                    }
                }, function(error) {
                    $.toast("提交信息失败", "cancel");
                })

        }
        
    }]);