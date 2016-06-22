/**
 * 物流详情
 *
 * @author Jimmie Hwang
 * @create 2016/6/15
 *
 */

angular.module("express.controller", ["express.service","orderDetails.service"])
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
    .controller("ExpressController", ["$scope", "$state", '$stateParams', "ExpressInfo",'OrderDetailsFty',
        function ($scope, $state, $stateParams, ExpressInfo,OrderDetailsFty) {
            document.title = "物流详情";

            var o_number = $stateParams.orderNumber;
            var p_img = $stateParams.productImg;
            var p_count = $stateParams.productCount;

            if(p_img != null && p_count != null){
                $scope.product_img = p_img;
                $scope.product_count = p_count;
                getExpressInfo(o_number);
            }else{
                getOrderInfo(o_number);
                getExpressInfo(o_number);
            }

            //获取物流信息
            function getExpressInfo(o_number) {
                ExpressInfo.ExpressService(o_number)
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.expressInfo = json.data;
                            //alert(angular.toJson($scope.expressInfo))
                            $scope.okclass = "trackList";
                        }

                    }, function (error) {
                        $.toast("获取信息失败", "cancel");
                    })
            }

            function getOrderInfo(orderNumber){

                OrderDetailsFty.orderDetailsService(orderNumber)
                    .then(function(json){
                        //alert(angular.toJson(json));
                        if(json.status_code == 0){
                            $scope.detailsInfo = json.data;
                            var count = 0;
                            var t_price = 0;
                            angular.forEach($scope.detailsInfo.order_items, function(v, k){
                                count+= v.quantity;
                                t_price += (v.final_price * v.quantity);
                            });
                            $scope.product_count = count;
                            $scope.product_img = $scope.detailsInfo.order_items[0].cover

                        }else{
                        }
                    }, function(error){
                    })
            }

        }]);