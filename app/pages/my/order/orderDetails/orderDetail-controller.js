angular.module('orderDetails.controller', ['orderDetails.service',"express.service"])

    .controller('OrderDetailsController', ['$scope','$state', '$stateParams', 'OrderDetailsFty','ExpressInfo','CommonJs',
        function($scope,$state,$stateParams, OrderDetailsFty,ExpressInfo,CommonJs){

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
                            //倒计时
                            countDown($scope.detailsInfo.created_date);
                            //物流信息
                            express_info($scope.detailsInfo.order_number);

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

                $scope.over_time = overtime;
                $scope.c_d_day = days;
                $scope.c_d_hour = hours;
            }

            //订单状态
            $scope.order_status = function(orderStatus){
                return CommonJs.OrderStatus(orderStatus);
            };

            //物流信息
            function express_info(order_number){

                ExpressInfo.ExpressService(order_number)
                    .then(function(json){
                        //alert(angular.toJson(json));
                        $scope.j_status_code = json.status_code;
                        if(json.status_code == 0){
                            $scope.ex_info = json.data.data;
                            if($scope.ex_info.length > 0){
                                $scope.ex_context =  $scope.ex_info[0].context;
                                $scope.ex_time =  $scope.ex_info[0].time;
                            }
                        }
                    }, function(error){
                        console.log("error" + error);
                    })
            }

            //进入退款退货
            $scope.goToSalesReturn = function(o_number, total_price, s_r_status){
                if(s_r_status == 1) {
                    $.confirm('', '确认要退款吗？', function (){
                        $state.go('salesReturn', {orderNumber: o_number, totalPrice: total_price, SalesReturnStatus:s_r_status});
                    }, function() {
                        //取消操作
                    });
                }else if(s_r_status == 2){
                    $.confirm('', '确认要退货？', function (){
                        $state.go('salesReturn', {orderNumber: o_number, totalPrice: total_price, SalesReturnStatus:s_r_status});
                    }, function() {
                        //取消操作
                    });
                }
            }

    }]);