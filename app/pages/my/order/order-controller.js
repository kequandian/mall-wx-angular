angular.module('my.order.controller', ['my.order.service', 'order.common'])
    .directive('whenActive', function () {
        return {
            scope: {},
            link: function (scope, element, attrs) {
                scope.$on('$stateChangeSuccess', function () {
                    element.addClass('weui_bar_item_on');
                });
            }
        };
    })
    .controller('OrderController', ['$scope', '$state', '$rootScope','$ocLazyLoad',
        function ($scope, $state, $rootScope,$ocLazyLoad) {

            //title
            document.title = "我的订单";

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    //console.log("order:jquery loaded");
                })
            });

            //nav 样式
            var scope = $rootScope;
            scope.$watch('orderTabsIndex', function (nValue, oValue) {
                $scope.currentId = nValue;
            });

            $scope.clickme = function (id) {
                $scope.currentId = id;
            };
            //title li
            $scope.order_titles = [{
                'id': '1',
                'name': '全部',
                'srefName': '.all'
            }, {
                'id': '2',
                'name': '待付款',
                'srefName': '.pay'
            }, {
                'id': '6',
                'name': '待成团',
                'srefName': '.pendingmass'
            }, {
                'id': '3',
                'name': '待发货',
                'srefName': '.payed'
            }, {
                'id': '4',
                'name': '待收货',
                'srefName': '.delivered'
            }, {
                'id': '5',
                'name': '已完成',
                'srefName': '.finish'
            }];
        }])

    /* 全部订单 */
    .controller('allController', ['$scope', '$state', '$rootScope', '$timeout', 'OrderFty', 'OrderCommon', 'BalanceSession',
        '$ocLazyLoad', function ($scope, $state, $rootScope, $timeout, OrderFty, OrderCommon, BalanceSession, $ocLazyLoad) {

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    //console.log("order:jquery loaded");
                })
            });

            $rootScope.orderTabsIndex = 1;

            //$.showLoading("正在加载...");

            $scope.allIsNull = true;
            $scope.allShow = true;

            AllOrders();
            function AllOrders() {
                OrderFty.ordersService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.orders = json.data;
                            //console.log(angular.toJson($scope.orders));
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
                        }
                    }, function (error) {
                        console.log(error);
                        $.toast('读取订单信息失败');
                    })
                    .finally(function () {
                        if ($scope.orders.length > 0) {
                            $scope.allIsNull = true;
                            $scope.allShow = false;
                        } else {
                            $scope.allIsNull = false;
                            $scope.allShow = true;
                        }
                        $timeout(function () {
                            //$.hideLoading();
                        }, 1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function (orderStatus) {
                return OrderCommon.OrderStatus(orderStatus);
            };

            //批发订单-退款退货
            $scope.isMarketing = function(item, num){

                if(item.marketing == 'WHOLESALE'){
                    return false;
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

                if(order.payment_type == "POINT" && BalanceSession.balance >= order.totalPrice){
                    window.location.href = '/app/payment/ppay/' + order.order_number;//积分
                }else if(order.payment_type == "WECHAT"){
                    window.location.href = '/app/payment/wpay/' + order.order_number; //微信
                }else{
                    window.location.href = '/app/payment/wpay/' + order.order_number; //微信
                }

            };

            //确认订单
            $scope.a_close_order_action = function (order_number) {

                $ocLazyLoad.load('Jquery').then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /*function start*/
                        $.confirm('', '确认收到货物吗？', function () {
                            //var order_status = "CLOSED_CONFIRMED";
                            OrderFty.closeOrderService(order_number)
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

                OrderFty.deliverReminderService(order_number)
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
                    OrderFty.deleteOverTimeOrderService(order_number)
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

            }


        }])

    /* 待付款 */
    .controller('payController', ['$scope', '$state', '$rootScope', '$timeout', 'OrderFty', 'OrderCommon','BalanceSession',
        function ($scope, $state, $rootScope, $timeout, OrderFty, OrderCommon, BalanceSession) {

            $rootScope.orderTabsIndex = 2;
            //$.showLoading("正在加载...");

            $scope.payIsNull = true;
            $scope.payShow = true;

            payOrders();
            function payOrders() {
                OrderFty.ordersService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            var orders = json.data;
                            $scope.payList = []; //待付款
                            angular.forEach(orders, function (v, k) {
                                if (v.status == "CREATED_PAY_PENDING") {
                                    $scope.payList.push(v);
                                }
                            });
                            //console.log('待付款： ' + angular.toJson($scope.payList));
                        } else {
                            $.toast('读取订单信息失败');
                        }
                    }, function (error) {
                        console.log(error);
                    })
                    .finally(function () {
                        if ($scope.payList.length > 0) {
                            $scope.payIsNull = true;
                            $scope.payShow = false;
                        } else {
                            $scope.payIsNull = false;
                            $scope.payShow = true;
                        }
                        $timeout(function () {
                            //$.hideLoading();
                        }, 1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function (orderStatus) {
                return OrderCommon.OrderStatus(orderStatus);
            };

            //订单销售类型
            $scope.marketing_status_pay = function(status){
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

            //立即付款
            $scope.weixin_pay = function (order) {
                if(order.payment_type == "POINT" && BalanceSession.balance >= order.totalPrice){
                    window.location.href = '/app/payment/ppay/' + order.order_number;//积分
                }else if(order.payment_type == "WECHAT"){
                    window.location.href = '/app/payment/wpay/' + order.order_number; //微信
                }else{
                    // default to wechat
                    window.location.href = '/app/payment/wpay/' + order.order_number; //微信
                }
            }

        }])

    /* 待发货 */
    .controller('payedController', ['$scope', '$state', '$rootScope', '$timeout', 'OrderFty', 'OrderCommon',
        '$ocLazyLoad', function ($scope, $state, $rootScope, $timeout, OrderFty, OrderCommon, $ocLazyLoad) {

            $rootScope.orderTabsIndex = 3;

            //$.showLoading("正在加载...");

            $scope.payedIsNull = true;
            $scope.payedShow = true;

            payedOrders();
            function payedOrders() {
                OrderFty.ordersService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            var orders = json.data;
                            $scope.payedList = [];//待发货
                            angular.forEach(orders, function (v, k) {
                                if (v.status == "CONFIRMED_DELIVER_PENDING") {
                                    $scope.payedList.push(v);
                                }
                            });
                            //console.log(angular.toJson($scope.payedList))
                        } else {
                            $.toast('读取订单信息失败');
                        }
                    }, function (error) {
                        console.log(error);
                    })
                    .finally(function () {
                        if ($scope.payedList.length > 0) {
                            $scope.payedIsNull = true;
                            $scope.payedShow = false;
                        } else {
                            $scope.payedIsNull = false;
                            $scope.payedShow = true;
                        }
                        $timeout(function () {
                            //$.hideLoading();
                        }, 1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function (orderStatus) {
                return OrderCommon.OrderStatus(orderStatus);
            };

            //订单销售类型
            $scope.marketing_status_payed = function(status){
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
                if (s_r_status == 3) {

                    $ocLazyLoad.load('Jquery').then(function () {
                        $ocLazyLoad.load('JqueryWeUI').then(function () {

                            /*function start*/
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
                            /*function end*/
                        })
                    });
                    /*end lazy*/
                }
            };

            //提醒发货
            $scope.deliverReminder = function (order_number) {

                OrderFty.deliverReminderService(order_number)
                    .then(function (json) {

                        $ocLazyLoad.load('Jquery').then(function () {
                            $ocLazyLoad.load('JqueryWeUI').then(function () {
                                console.log(json);
                                if (json.status_code == 0) {
                                    $.toast('已提醒卖家发货');
                                    //$state.go('order.payed', {}, {reload: true});
                                } else {
                                    $.toast('发送失败', 'cancel');
                                }
                            })
                        });

                    }, function (error) {
                        console.log(error);
                    })
            }

            //批发订单-退款退货
            $scope.isMarketing = function(item, num){

                if(item.marketing == 'WHOLESALE'){
                    return false;
                }

                if(num == 3){
                    if(item.status == 'PAID_DELIVER_PENDING'){
                        return true
                    }else{
                        return false;
                    }
                }else if(num == 1){
                    return true
                }
                return true;

            };

        }])

    /* 待收货 */
    .controller('deliveredController', ['$scope', '$state', '$rootScope', '$timeout', 'OrderFty', 'OrderCommon',
        '$ocLazyLoad', function ($scope, $state, $rootScope, $timeout, OrderFty, OrderCommon, $ocLazyLoad) {

            $rootScope.orderTabsIndex = 4;
            //$.showLoading("正在加载...");

            $scope.deliveredIsNull = true;
            $scope.deliveredShow = true;
            var loaded = false;

            deliveredOrders();
            function deliveredOrders() {
                OrderFty.ordersService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            var orders = json.data;
                            //alert(angular.toJson($scope.orders));
                            $scope.deliveredList = [];//待收货
                            angular.forEach(orders, function (v, k) {
                                if (v.status == "DELIVERING" || v.status == "DELIVERED_CONFIRM_PENDING") {
                                    v.isDelivered = (v.status=="DELIVERED_CONFIRM_PENDING");

                                    $scope.deliveredList.push(v);
                                }
                            });
                        } else {
                            $.toast('读取订单信息失败');
                        }
                    }, function (error) {
                        console.log(error);
                    })
                    .finally(function () {
                        if ($scope.deliveredList.length > 0) {
                            $scope.deliveredIsNull = true;
                            $scope.deliveredShow = false;
                            loaded = true;
                        } else {
                            $scope.deliveredIsNull = false;
                            $scope.deliveredShow = true;
                            loaded = false;
                        }
                        $timeout(function () {
                            //$.hideLoading();
                        }, 1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function (orderStatus) {
                return OrderCommon.OrderStatus(orderStatus);
            };

            //订单销售类型
            $scope.marketing_status_del = function(status){
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

                if (s_r_status == 1) {

                    $ocLazyLoad.load('Jquery').then(function () {
                        $ocLazyLoad.load('JqueryWeUI').then(function () {

                            /*function start*/
                            $.confirm('', '确认要退货吗？', function () {
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
                            /*function end*/
                        })
                    });
                    /*end lazy*/

                }
            };

            //进入物流详情
            $scope.goToExpress_delivered = function (item) {

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

            //确认订单
            $scope.close_order_action = function (order_number) {

                if(!loaded){
                    $.toast('加载中', 'cancel');
                    return;
                }

                $ocLazyLoad.load('Jquery').then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /*function start*/
                        $.confirm('', '确认收到货物吗？', function () {
                            //var order_status = "CLOSED_CONFIRMED";
                            OrderFty.closeOrderService(order_number)
                                .then(function (json) {
                                    //console.log(angular.toJson(json));
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

            //批发订单-退款退货
            $scope.isMarketingDel = function(item, num){
                //console.log('orderNumber: ' + item.order_number)
                //console.log('status: ' + item.status)
                if(item.marketing == 'WHOLESALE'){
                    return false;
                }

                if(num == 1){
                    if(item.isDelivered){
                        return true;
                    }else{
                        return false;
                    }
                }
                return true;

            };

        }])

    /* 已完成 */
    .controller('finishController', ['$scope', '$state', '$rootScope', '$timeout', 'OrderFty', 'OrderCommon',
        function ($scope, $state, $rootScope, $timeout, OrderFty, OrderCommon) {

            $rootScope.orderTabsIndex = 5;
            //$.showLoading("正在加载...");

            $scope.finishIsNull = true;
            $scope.finishShow = true;

            finishOrders();
            function finishOrders() {
                OrderFty.ordersService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            var orders = json.data;
                            //alert(angular.toJson($scope.orders));
                            $scope.finishList = [];//已完成
                            angular.forEach(orders, function (v, k) {
                                //已完成
                                if (v.status == "CLOSED_CONFIRMED") {
                                    $scope.finishList.push(v);
                                }
                            });
                        } else {
                            $.toast('读取订单信息失败');
                        }
                    }, function (error) {
                        console.log(error);
                    })
                    .finally(function () {
                        if ($scope.finishList.length > 0) {
                            $scope.finishIsNull = true;
                            $scope.finishShow = false;
                        } else {
                            $scope.finishIsNull = false;
                            $scope.finishShow = true;
                        }
                        $timeout(function () {
                            //$.hideLoading();
                        }, 1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function (orderStatus) {
                return OrderCommon.OrderStatus(orderStatus);
            };

            //订单销售类型
            $scope.marketing_status_fin = function(status){
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

            //进入物流详情
            $scope.goToExpress_finish = function (item) {
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

        }])


    /* 待成团 */
    .controller('PendingMassController', ['$scope', '$state', '$rootScope', '$timeout', 'OrderFty','PointRate','BalanceSession',
        function ($scope, $state, $rootScope, $timeout, OrderFty,PointRate,BalanceSession) {

            $rootScope.orderTabsIndex = 6;
            //$.showLoading("正在加载...");

            $scope.pendingMassIsNull = true;
            $scope.pendingMassShow = true;

            pendingMassOrders();
            function pendingMassOrders() {
                OrderFty.pendingMassOrderService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            //console.log(angular.toJson(json));
                            $scope.pendingMassList = json.data.list;
                        } else {
                            $.toast('读取订单信息失败');
                        }
                    }, function (error) {
                        console.log(error);
                    })
                    .finally(function () {
                        if ($scope.pendingMassList.length > 0) {
                            $scope.pendingMassIsNull = true;
                            $scope.pendingMassShow = false;
                        } else {
                            $scope.pendingMassIsNull = false;
                            $scope.pendingMassShow = true;
                        }
                    })
            }

            //订单状态
            $scope.piece_group_count = function (item) {

                var count = item.min_participator_count - item.paid_members_count;

                if(count > 0){
                    return '拼团中,差' + count + '人';
                }else if(count <= 0){
                    return '已成团';
                }
                return '';
            };

            //检查订单支付方式
            $scope.cash_and_point = function(item){

                var point = PointRate.rate;
                if(item.payment_type == 'POINT'){
                    return ((item.price * point).toFixed(0)) + '积分';
                }else if(item.payment_type == 'WECHAT'){
                }
                return '￥' + (item.price.toFixed(2));
            };

            //邀请好友拼团
            $scope.inviting_friends = function (item) {

                if(item.payment_type == "POINT" && BalanceSession.balance >= item.totalPrice){
                    window.location.href = '/app/payment/ppay/' + item.order_number;//积分
                }else if(item.payment_type == "WECHAT"){
                    window.location.href = '/app/payment/wpay/' + item.order_number; //微信
                }else{
                    window.location.href = '/app/payment/wpay/' + item.order_number; //微信
                }
            };

        }])

;



