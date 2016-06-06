angular.module('refund.controller', ['refund.service'])

    .controller('RefundController', ['$scope','$state', '$stateParams', 'RefundFty',
        function($scope,$state,$stateParams, RefundFty){

            refundList();
            $scope.refund_all_null = true;
            $scope.refund_all_show = true;

            $scope.refunds = [];
            function refundList(){

                RefundFty.refundService()
                    .then(function(json){
                        //alert(angular.toJson(json));
                        if(json.status_code == 0){
                            $scope.refund_orders = json.data;
                            var count = 0;
                            var t_price = 0;
                            angular.forEach($scope.refund_orders, function(v, k){
                                if(v.status == "CANCELED_RETURN_PENDING" || v.status == "CANCELED_REFUND_PENDING" || v.status == "CLOSED_REFUNDED"){
                                    $scope.refunds.push(v);
                                }
                            });

                            if($scope.refunds.length > 0){
                                $scope.refund_all_null = true;
                                $scope.refund_all_show = false;
                            }else{
                                $scope.refund_all_null = false;
                                $scope.refund_all_show = true;
                            }

                        }else{
                            $.toast("获取订单信息失败","cancel")
                        }
                    }, function(error){
                        $.toast("获取订单信息失败","cancel")
                    })
            }

        }]);