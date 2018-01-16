angular.module('finishOrder.controller', [/*'finishOrder.service',*/'businessOrder.service'])

    .controller('FinishBusinessOrderController', ['$scope', '$state', '$stateParams', '$rootScope', 'BusinessOrderFty',
        '$ocLazyLoad','OrderCommon',
        function ($scope, $state, $stateParams,$rootScope, BusinessOrderFty, $ocLazyLoad, OrderCommon) {

            $rootScope.businessOrderTabsIndex = 5;
            //$.showLoading("正在加载...");

            $scope.finishIsNull = true;
            $scope.finishShow = true;

            finishOrders();
            function finishOrders() {
                BusinessOrderFty.ordersService()
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

        }]);