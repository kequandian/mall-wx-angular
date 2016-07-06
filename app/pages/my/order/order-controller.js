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
    .controller('OrderController', ['$scope', '$state', '$rootScope',
        function ($scope, $state, $rootScope) {

            //title
            document.title = "我的订单";

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
    .controller('allController', ['$scope', '$state', '$rootScope', '$timeout', 'OrderFty', 'OrderCommon',
        '$ocLazyLoad', function ($scope, $state, $rootScope, $timeout, OrderFty, OrderCommon, $ocLazyLoad) {

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
                            //alert(angular.toJson($scope.orders));
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
                                if (v.status == "CONFIRMED_DELIVER_PENDING" || v.status == "PAID_CONFIRM_PENDING") {
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

            //进入退款退货
            $scope.goToSalesReturn = function (o_number, total_price, s_r_status) {

                $ocLazyLoad.load('JqueryWeUI').then(function () {

                    /*function start*/
                    if (s_r_status == 1) {
                        $.confirm('', '确认要退款吗？', function () {
                            $state.go('salesReturn', {
                                orderNumber: o_number,
                                totalPrice: total_price,
                                SalesReturnStatus: s_r_status
                            });
                        }, function () {
                            //取消操作
                        });
                    } else if (s_r_status == 2) {
                        $.confirm('', '确认要退货？', function () {
                            $state.go('salesReturn', {
                                orderNumber: o_number,
                                totalPrice: total_price,
                                SalesReturnStatus: s_r_status
                            });
                        }, function () {
                            //取消操作
                        });
                    }
                    /*function end*/
                });
                /*end lazy*/

            };

            //进入物流详情
            $scope.goToExpress_all = function (number) {
                $state.go('express', {orderNumber: number, productImg: null, productCount: null});
            };

            //立即付款
            $scope.weixin_pay = function (order_number) {
                window.location.href = '/app/payment/wpay/' + order_number;
            };

            //确认订单
            $scope.a_close_order_action = function (order_number) {

                $ocLazyLoad.load('Jquery').then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /*function start*/
                        $.confirm('', '确认收到货物吗？', function () {
                            var order_status = "CLOSED_CONFIRMED";
                            OrderFty.closeOrderService(order_number, order_status)
                                .then(function (json) {
                                    if (json.status_code == 0) {
                                        $.toast('确认成功');
                                        $state.go('order.all', {}, {reload: true});
                                    } else {
                                        $.toast('确认失败', 'cancel');
                                    }
                                }, function (error) {
                                    console.log(error);
                                })
                        })
                        /*function end*/
                    })
                });
                /*end lazy*/
            };

            //提醒发货
            $scope.deliverReminder = function (order_number) {

                OrderFty.deliverReminderService(order_number)
                    .then(function (json) {

                        $ocLazyLoad.load('JqueryWeUI').then(function () {

                            if (json.status_code == 0) {
                                $.toast('已提醒卖家发货');
                                $state.go('order.all', {}, {reload: true});
                            } else {
                                $.toast('发送失败', 'cancel');
                            }
                        })


                    }, function (error) {
                        console.log(error);
                    })
            }
        }])

    /* 待付款 */
    .controller('payController', ['$scope', '$state', '$rootScope', '$timeout', 'OrderFty', 'OrderCommon',
        function ($scope, $state, $rootScope, $timeout, OrderFty, OrderCommon) {

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

            //立即付款
            $scope.weixin_pay = function (order_number) {
                window.location.href = '/app/payment/wpay/' + order_number;
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
                            //alert(angular.toJson($scope.orders));
                            $scope.payedList = [];//待发货
                            angular.forEach(orders, function (v, k) {
                                if (v.status == "CONFIRMED_DELIVER_PENDING" || v.status == "PAID_CONFIRM_PENDING") {
                                    $scope.payedList.push(v);
                                }
                            });
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

            //进入退款退货
            $scope.goToSalesReturn = function (o_number, total_price, s_r_status) {
                if (s_r_status == 1) {

                    $ocLazyLoad.load('Jquery').then(function () {
                        $ocLazyLoad.load('JqueryWeUI').then(function () {

                            /*function start*/
                            $.confirm('', '确认要退款吗？', function () {
                                $state.go('salesReturn', {
                                    orderNumber: o_number,
                                    totalPrice: total_price,
                                    SalesReturnStatus: s_r_status
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

                        $ocLazyLoad.load('JqueryWeUI').then(function () {

                            if (json.status_code == 0) {
                                $.toast('已提醒卖家发货');
                                $state.go('order.pay', {}, {reload: true});
                            } else {
                                $.toast('发送失败', 'cancel');
                            }
                        })

                    }, function (error) {
                        console.log(error);
                    })
            }

        }])

    /* 待收货 */
    .controller('deliveredController', ['$scope', '$state', '$rootScope', '$timeout', 'OrderFty', 'OrderCommon',
        '$ocLazyLoad', function ($scope, $state, $rootScope, $timeout, OrderFty, OrderCommon, $ocLazyLoad) {

            $rootScope.orderTabsIndex = 4;
            //$.showLoading("正在加载...");

            $scope.deliveredIsNull = true;
            $scope.deliveredShow = true;

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
                        } else {
                            $scope.deliveredIsNull = false;
                            $scope.deliveredShow = true;
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


            //进入退款退货
            $scope.goToSalesReturn = function (o_number, total_price, s_r_status) {
                if (s_r_status == 2) {

                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /*function start*/
                        $.confirm('', '确认要退货吗？', function () {
                            $state.go('salesReturn', {
                                orderNumber: o_number,
                                totalPrice: total_price,
                                SalesReturnStatus: s_r_status
                            });
                        }, function () {
                            //取消操作
                        });
                        /*function end*/
                    });
                    /*end lazy*/

                }
            };

            //进入物流详情
            $scope.goToExpress_delivered = function (o_number) {
                console.log('go express')
                $state.go('express', {orderNumber: o_number, productImg: null, productCount: null});
            };

            //确认订单
            $scope.close_order_action = function (order_number) {

                $ocLazyLoad.load('JqueryWeUI').then(function () {

                    /*function start*/
                    $.confirm('', '确认收到货物吗？', function () {
                        //var order_status = "CLOSED_CONFIRMED";
                        OrderFty.closeOrderService(order_number)
                            .then(function (json) {
                                console.log(angular.toJson(json));
                                if (json.status_code == 0) {
                                    $.toast('确认成功');
                                    $state.go('order.delivered', {}, {reload: true});
                                } else {
                                    $.toast('确认失败', 'cancel');
                                }
                            }, function (error) {
                                console.log(error);
                            })
                    })
                    /*function end*/
                });
                /*end lazy*/
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
                                if (v.status == "CLOSED_CONFIRMED" || v.status == "CLOSED_REFUNDED") {
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

        }])

;



