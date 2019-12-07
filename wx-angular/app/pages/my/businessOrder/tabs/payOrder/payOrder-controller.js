angular.module('payOrder.controller', [/*'payOrder.service',*/'businessOrder.service'])

    .controller('PayBusinessOrderController', ['$scope', '$state', '$stateParams', '$rootScope', 'BusinessOrderFty',
        '$ocLazyLoad', 'OrderCommon','BalanceSession',
        function ($scope, $state, $stateParams,$rootScope, BusinessOrderFty, $ocLazyLoad,OrderCommon, BalanceSession) {

            $rootScope.businessOrderTabsIndex = 2;

            $scope.payIsNull = false;
            $scope.payShow = true;

            payOrders();
            function payOrders() {
                BusinessOrderFty.businessOrdersService()
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
                        //$timeout(function () {
                        //$.hideLoading();
                        //}, 1000);
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
            }

            //取消待付款订单
            $scope.cancel_pay_order = function(orderNumber){

                $.confirm('', '确认要取消订单吗？', function () {
                    BusinessOrderFty.cancelPayOrderService(orderNumber)
                        .then(function (json) {
                            $ocLazyLoad.load('Jquery').then(function () {
                                $ocLazyLoad.load('JqueryWeUI').then(function () {

                                    if (json.status_code == 0) {
                                        //$state.go('order.all', {}, {reload: true});
                                        angular.forEach($scope.payList, function(v , k){
                                            if(v.order_number == orderNumber){
                                                $scope.payList.splice(k,1);
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