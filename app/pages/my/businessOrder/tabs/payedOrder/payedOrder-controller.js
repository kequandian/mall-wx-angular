angular.module('payedOrder.controller', [/*'payedOrder.service',*/'businessOrder.service'])

    .controller('PayedBusinessOrderController', ['$scope', '$state', '$stateParams', '$rootScope', 'BusinessOrderFty',
        '$ocLazyLoad', 'OrderCommon',
        function ($scope, $state, $stateParams,$rootScope, BusinessOrderFty, $ocLazyLoad, OrderCommon) {

            $rootScope.businessOrderTabsIndex = 3;

            $scope.payedIsNull = false;
            $scope.payedShow = true;

            payedOrders();
            function payedOrders() {
                BusinessOrderFty.ordersService()
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

                BusinessOrderFty.deliverReminderService(order_number)
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
            $scope.isMarketingPayed = function(item, num){

                return true;

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


        }]);