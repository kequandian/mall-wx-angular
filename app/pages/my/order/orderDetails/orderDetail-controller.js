angular.module('orderDetails.controller', ['orderDetails.service'])

    .controller('OrderDetailsController', ['$scope','$state', '$stateParams', 'OrderDetailsFty','CommonJs',
        function($scope,$state,$stateParams, OrderDetailsFty,CommonJs){

            orderDetails();
            function orderDetails(){

                var orderNumber = $stateParams.orderNumber;

                OrderDetailsFty.orderDetailsService(orderNumber)
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.detailsInfo = json.data;

                            var count = 0;
                            angular.forEach($scope.detailsInfo.order_items, function(v, k){
                                count+= v.quantity;
                            });
                            $scope.productCount = count;



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