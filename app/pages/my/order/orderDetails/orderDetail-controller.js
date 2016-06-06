angular.module('orderDetails.controller', ['orderDetails.service'])

    .controller('OrderDetailsController', ['$scope','$state', '$stateParams', 'OrderDetailsFty','CommonJs',
        function($scope,$state,$stateParams, OrderDetailsFty,CommonJs){

            orderDetails();
            function orderDetails(){

                var orderNumber = $stateParams.orderNumber;

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
                            $scope.productCount = count;
                            $scope.total_price = t_price + $scope.detailsInfo.freight;



                        }else{
                            $.toast("获取订单详情失败","cancel")
                        }
                    }, function(error){
                        $.toast("获取订单详情失败","cancel")
                    })

            }


            //订单状态
            $scope.order_jy_status = function(orderStatus){
                return CommonJs.OrderStatus(orderStatus);
            };


    }]);