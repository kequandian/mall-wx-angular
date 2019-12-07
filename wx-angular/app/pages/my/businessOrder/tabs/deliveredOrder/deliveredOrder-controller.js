angular.module('deliveredOrder.controller', [/*'deliveredOrder.service',*/'businessOrder.service'])

    .controller('DeliveredBusinessOrderController', ['$scope', '$state', '$stateParams', '$rootScope', 'BusinessOrderFty',
        '$ocLazyLoad','OrderCommon',
        function ($scope, $state, $stateParams,$rootScope, BusinessOrderFty, $ocLazyLoad, OrderCommon) {

            $rootScope.businessOrderTabsIndex = 4;

            $scope.deliveredIsNull = false;
            $scope.deliveredShow = true;

            deliveredOrders();
            function deliveredOrders() {
                BusinessOrderFty.businessOrdersService()
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

        }]);