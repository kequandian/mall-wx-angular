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

                            $scope.order_address = "";
                            if($scope.detailsInfo.province != null){
                                $scope.order_address += $scope.detailsInfo.province;
                            }
                            if($scope.detailsInfo.city != null){
                                $scope.order_address += $scope.detailsInfo.city;
                            }
                            if($scope.detailsInfo.district != null){
                                $scope.order_address += $scope.detailsInfo.district;
                            }
                            if($scope.detailsInfo.street != null){
                                $scope.order_address += $scope.detailsInfo.street;
                            }
                            if($scope.detailsInfo.street_number != null){
                                $scope.order_address += $scope.detailsInfo.street_number;
                            }
                            if($scope.detailsInfo.detail != null){
                                $scope.order_address += $scope.detailsInfo.detail;
                            }

                            countDown($scope.detailsInfo.created_date);

                        }else{
                            $.toast("获取订单详情失败","cancel")
                        }
                    }, function(error){
                        $.toast("获取订单详情失败","cancel")
                    })

            }

            function countDown(o_time){
                var begintime_ms = Date.parse(new Date(o_time.replace(/-/g, "/")));
                begintime_ms += 604800000;
                var endtime_ms = Date.parse(new Date());
                var overtime = begintime_ms - endtime_ms;

                var days = Math.floor(overtime/(24*3600*1000));

                var leave1 = overtime%(24*3600*1000);    //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1/(3600*1000));
                //计算相差分钟数
                //var leave2 = leave1%(3600*1000);        //计算小时数后剩余的毫秒数
                //var minutes = Math.floor(leave2/(60*1000));
                //计算相差秒数
                //var leave3 = leave2%(60*1000);      //计算分钟数后剩余的毫秒数
                //var seconds = Math.round(leave3/1000);
                //alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")

                $scope.c_d_day = days;
                $scope.c_d_hour = hours;
            }


            //订单状态
            $scope.order_status = function(orderStatus){
                return CommonJs.OrderStatus(orderStatus);
            };


    }]);