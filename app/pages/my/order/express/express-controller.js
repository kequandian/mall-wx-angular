/**
 * 物流详情
 *
 * @author Jimmie Hwang
 * @create 2016/6/15
 *
 */

angular.module("express.controller", ["express.service","orderDetails.service"])
    //订单物流状态

    /**
     * 0：在途，即货物处于运输过程中；
     1：揽件，货物已由快递公司揽收并且产生了第一条跟踪信息；
     2：疑难，货物寄送过程出了问题；
     3：签收，收件人已签收；
     4：退签，即货物由于用户拒签、超区等原因退回，而且发件人已经签收；
     5：派件，即快递正在进行同城派件；
     6：退回，货物正处于退回发件人的途中；
     */
    .filter("expressStatus", function(){
        return function(state){
            switch (state){
                case 0:
                    return "在途中";
                case 1:
                    return "已揽件";
                case 2:
                    return "投递疑难";
                case 3:
                    return "已签收";
                case 4:
                    return "已退签";
                case 5:
                    return "派件中";
                case 6:
                    return "退回中";

                default : "未知状况"
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