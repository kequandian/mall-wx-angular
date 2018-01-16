angular.module('allOrder.controller', [/*'allOrder.service',*/'businessOrder.service'])

    .controller('AllBusinessOrderController', ['$scope', '$state', '$stateParams', '$rootScope','BusinessOrderFty',
        '$ocLazyLoad','OrderCommon','BalanceSession',
        function ($scope, $state, $stateParams,$rootScope,BusinessOrderFty, $ocLazyLoad,OrderCommon,BalanceSession) {

            //console.log("商家全部订单")

            $rootScope.businessOrderTabsIndex = 1;

            $scope.allIsNull = false;
            $scope.allShow = true;

            AllOrders();
            function AllOrders() {
                BusinessOrderFty.ordersService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.orders = json.data;
                            //console.log("商家订单" ,angular.toJson($scope.orders));
                            $scope.order_list = [];
                            //angular.forEach($scope.orders, function (v, k) {
                            //    if (v.status != "CANCELED_RETURN_PENDING" && v.status != "CANCELED_REFUND_PENDING" && v.status != "CLOSED_REFUNDED") {
                            //        $scope.order_list.push(v);
                            //    }
                            //});
                            //待确认
                            angular.forEach($scope.orders, function (v, k) {
                                if (v.status == "DELIVERING" || v.status == "DELIVERED_CONFIRM_PENDING") {
                                    $scope.order_list.push(v);
                                }
                            });

                            //待付款
                            angular.forEach($scope.orders, function (v, k) {
                                if (v.status == "CREATED_PAY_PENDING") {
                                    $scope.order_list.push(v);
                                }
                            });

                            //待发货
                            angular.forEach($scope.orders, function (v, k) {
                                if (v.status == "CONFIRMED_DELIVER_PENDING") {
                                    $scope.order_list.push(v);
                                }
                            });

                            //已完成
                            angular.forEach($scope.orders, function (v, k) {
                                if (v.status == "CLOSED_CONFIRMED") {
                                    $scope.order_list.push(v);
                                }
                            });

                            //支付超时
                            angular.forEach($scope.orders, function (v, k) {
                                if (v.status == "CLOSED_PAY_TIMEOUT") {
                                    $scope.order_list.push(v);
                                }
                            });
                        } else {
                            $.toast('读取订单信息失败');
                            console.log('读取订单信息失败', angular.toJson(json))
                        }
                    }, function (error) {
                        console.log(error);
                        $.toast('读取订单信息失败');
                        console.log('读取订单信息失败', angular.toJson(json))
                    })
                    .finally(function () {
                        if ($scope.orders.length > 0) {
                            $scope.allIsNull = true;
                            $scope.allShow = false;
                        } else {
                            $scope.allIsNull = false;
                            $scope.allShow = true;
                        }
                        //$timeout(function () {
                            //$.hideLoading();
                        //}, 1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function (orderStatus) {
                return OrderCommon.OrderStatus(orderStatus);
            };

            //批发订单-退款退货
            $scope.isMarketing = function(item, num){

                //console.log('orderNumber: ' + item.order_number)
                //console.log('status: ' + item.status)
                if(item.marketing == 'WHOLESALE'){
                    if(num == 3){
                        if(item.status == 'CONFIRMED_DELIVER_PENDING'){
                            return true
                        }else{
                            return false;
                        }
                    }else if(num == 1){
                        if(item.status == 'DELIVERED_CONFIRM_PENDING'){
                            return false
                        }else{
                            return true;
                        }
                    }
                }

                if(num == 3){
                    if(item.status == 'PAID_DELIVER_PENDING'){
                        return true;
                    }else{
                        return false;
                    }
                }else if(num == 1){
                    return true;
                }
                return true;

            };

            //订单销售类型
            $scope.marketing_status_all = function(status){
                if(status == null){
                    $scope.marketing_text = null;
                    return false;
                }else if(status == 'PIECE-GROUP'){
                    $scope.marketing_text = '【拼团】';
                    return true;
                }else if(status == 'WHOLESALE'){
                    $scope.marketing_text = '【批发】';
                    return true;
                }
            };

            //检查订单支付方式
            $scope.cash_and_point = function(price, point, pay_type){
                if(pay_type == 'POINT'){
                    return ((price * point).toFixed(0)) + '积分';
                }else if(pay_type == 'WECHAT'){
                }
                return '￥' + price.toFixed(2);
            };

            //进入退款退货
            $scope.goToSalesReturn = function (item, s_r_status) {

                $ocLazyLoad.load('Jquery').then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /!*function start*!/
                        if (s_r_status == 3) {
                            $.confirm('', '确认要退款吗？', function () {
                                $state.go('salesReturn', {
                                    orderNumber: item.order_number,
                                    totalPrice: item.total_price,
                                    SalesReturnStatus: s_r_status,
                                    paymentType:item.payment_type,
                                    point:item.point_exchange_rate
                                });
                            }, function () {
                                //取消操作
                            });
                        } else if (s_r_status == 1) {
                            $.confirm('', '确认要退货？', function () {
                                $state.go('salesReturn', {
                                    orderNumber: item.order_number,
                                    totalPrice: item.total_price,
                                    SalesReturnStatus: s_r_status,
                                    paymentType:item.payment_type,
                                    point:item.point_exchange_rate
                                });
                            }, function () {
                                //取消操作
                            });
                        }
                        /!*function end*!/
                    })
                });
                /!*end lazy*!/

            };

            //进入物流详情
            $scope.goToExpress_all = function (item) {

                var count = 0;
                if(item.order_items != null){
                    angular.forEach(item.order_items, function (v, k) {
                        count += v.quantity;
                    });
                }else{
                    count = -1;
                }

                $state.go('express', {
                    orderNumber: item.order_number,
                    productImg: item.cover,
                    productCount: count,
                    expressNumber:item.express_number,
                    expressCompany:item.express_company
                });
            };

            //立即付款
            $scope.weixin_pay = function (order) {

                if(order.payment_type == "POINT"){
                    if(BalanceSession.balance >= order.totalPrice){
                        window.location.href = '/app/payment/ppay/' + order.order_number;//积分
                    }else{
                        $.alert('您的积分不足','提示');
                    }
                }else if(order.payment_type == "WECHAT"){
                    window.location.href = '/app/payment/wpay/' + order.order_number; //微信
                }else{
                    // default to wechat
                    $.alert('支付异常请联系客服','提示');
                    console.log("支付异常：" + angular.toJson(order));
                }

            };

            //确认订单
            $scope.a_close_order_action = function (order_number) {

                $ocLazyLoad.load('Jquery').then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /*function start*/
                        $.confirm('', '确认收到货物吗？', function () {
                            //var order_status = "CLOSED_CONFIRMED";
                            BusinessOrderFty.closeOrderService(order_number)
                                .then(function (json) {
                                    if (json.status_code == 0) {
                                        $.toast('确认成功');
                                        $state.go('order.finish', {}, {reload: true});
                                    } else {
                                        $.toast('确认失败', 'cancel');
                                    }
                                }, function (error) {
                                    console.log(error);
                                })
                        });
                        /*function end*/
                    })
                });
                /*end lazy*/
            };

            //提醒发货
            $scope.deliverReminder = function (order_number) {

                BusinessOrderFty.deliverReminderService(order_number)
                    .then(function (json) {

                        $ocLazyLoad.load('Jquery').then(function () {
                            $ocLazyLoad.load('JqueryWeUI').then(function () {

                                if (json.status_code == 0) {
                                    $.toast('已提醒卖家发货');
                                    //$state.go('order.all', {}, {reload: true});
                                } else {
                                    $.toast('发送失败', 'cancel');
                                }
                            })
                        })


                    }, function (error) {
                        console.log(error);
                    })
            };

            //删除支付超时订单
            $scope.delete_over_time_order = function(order_number){

                $.confirm('', '确认要退款吗？', function () {
                    BusinessOrderFty.deleteOverTimeOrderService(order_number)
                        .then(function (json) {
                            $ocLazyLoad.load('Jquery').then(function () {
                                $ocLazyLoad.load('JqueryWeUI').then(function () {

                                    if (json.status_code == 0) {
                                        //$state.go('order.all', {}, {reload: true});

                                        angular.forEach($scope.order_list, function(v , k){
                                            if(v.order_number == order_number){
                                                $scope.order_list.splice(k,1);
                                            }
                                        });

                                        $.toast('移除成功');

                                    } else {
                                        $.toast('移除失败', 'cancel');
                                    }
                                })
                            })
                        }, function (error) {
                            console.log(angular.toJson(error));
                        })
                }, function () {
                    //取消操作
                });

            };

            //取消待付款订单
            $scope.all_cancel_pay_order = function(orderNumber){

                $.confirm('', '确认要取消订单吗？', function () {
                    BusinessOrderFty.cancelPayOrderService(orderNumber)
                        .then(function (json) {
                            $ocLazyLoad.load('Jquery').then(function () {
                                $ocLazyLoad.load('JqueryWeUI').then(function () {

                                    if (json.status_code == 0) {
                                        //$state.go('order.all', {}, {reload: true});

                                        angular.forEach($scope.order_list, function(v , k){
                                            if(v.order_number == orderNumber){
                                                $scope.order_list.splice(k,1);
                                            }
                                        });

                                        $.toast('移除成功');

                                    } else {
                                        $.toast('移除失败', 'cancel');
                                    }
                                })
                            })
                        }, function (error) {
                            console.log(angular.toJson(error));
                        })
                }, function () {
                    //取消操作
                });
            }

        }]);