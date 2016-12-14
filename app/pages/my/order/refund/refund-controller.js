angular.module('refund.controller', ['refund.service'])
    //退款退货状态
    .filter("refundStatus", function () {
        return function (input) {
            if (input == "CANCELED_RETURN_PENDING") {
                return "退货中";
            }
            else if (input == "CANCELED_REFUND_PENDING") {
                return "退款中";
            }
            else if (input == "CLOSED_REFUNDED") {
                return "已退款";
            }
        }
    })
    .controller('RefundController', ['$scope', '$state', 'RefundFty',
        function ($scope, $state, RefundFty) {

            document.title = '退款/售后';

            //refundList();
            refundOrderList();
            $scope.refund_all_null = true;
            $scope.refund_all_show = true;

            $scope.refunds = [];
            /!* begin *!/
            function refundList() {
                RefundFty.refundService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.refund_orders = json.data;
                            //console.log(json.data)
                            angular.forEach($scope.refund_orders, function (v, k) {
                                if (v.status == "CANCELED_RETURN_PENDING" || v.status == "CANCELED_REFUND_PENDING" || v.status == "CLOSED_REFUNDED") {
                                    $scope.refunds.push(v);
                                }
                            });
                            //console.log(angular.toJson($scope.refunds));
                            if ($scope.refunds.length > 0) {
                                $scope.refund_all_null = true;
                                $scope.refund_all_show = false;
                            } else {
                                $scope.refund_all_null = false;
                                $scope.refund_all_show = true;
                            }

                        } else {
                            $.toast("获取订单信息失败", "cancel")
                        }
                    }, function (error) {
                        $.toast("获取订单信息失败", "cancel")
                    })
            }
            /!* end *!/

            //获取退货退款订单信息
            function refundOrderList(){
                RefundFty.refundOrderService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.refund_orders = json.data;
                            //console.log(angular.toJson(json.data));
                            if ($scope.refund_orders.length > 0) {
                                $scope.refund_all_null = true;
                                $scope.refund_all_show = false;
                            } else {
                                $scope.refund_all_null = false;
                                $scope.refund_all_show = true;
                            }

                        } else {
                            $.toast("获取订单信息失败", "cancel")
                        }
                    }, function (error) {
                        $.toast("获取订单信息失败", "cancel")
                    })
            }

            //订单交易类型
            $scope.pay_type = function(item){

                var pay_type = item.payment_type;
                var total_price = item.total_price;//总金额
                var point = item.point_exchange_rate;
                var refund_fee = item.order_customer_service.refund_fee; //退货金额

                if(pay_type == 'WECHAT'){
                    if(refund_fee != null){
                        $scope.sales_return_type_text = '退款金额: ￥' + refund_fee.toFixed(2);
                    }else{
                        $scope.sales_return_type_text = '退款金额: ￥0';
                    }

                    if(total_price != null){
                        $scope.pay_type_text = '交易金额: ￥' + total_price.toFixed(2);
                    }else{
                        $scope.pay_type_text = '交易金额: ￥0';
                    }
                }else if(pay_type == 'POINT'){

                    if(refund_fee != null){
                        $scope.sales_return_type_text = '退款积分: ' + ((refund_fee*point).toFixed(0));
                    }else{
                        $scope.sales_return_type_text = '退款积分: 0';
                    }

                    if(total_price != null){
                        $scope.pay_type_text = '交易积分: ' + ((total_price*point).toFixed(0));
                    }else{
                        $scope.pay_type_text = '交易积分: 0';
                    }
                }

            }

        }]);