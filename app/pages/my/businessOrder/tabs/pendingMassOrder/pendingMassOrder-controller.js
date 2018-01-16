angular.module('pendingMassOrder.controller', [/*'pendingMassOrder.service',*/'businessOrder.service'])

    .controller('PendingMassBusinessOrderController', ['$scope', '$state', '$stateParams', '$rootScope', 'BusinessOrderFty',
        '$ocLazyLoad','PointRate','BalanceSession',
        function ($scope, $state, $stateParams,$rootScope, BusinessOrderFty, $ocLazyLoad,PointRate,BalanceSession) {

            $rootScope.orderTabsIndex = 6;
            //$.showLoading("正在加载...");

            $scope.pendingMassIsNull = true;
            $scope.pendingMassShow = true;

            pendingMassOrders();
            function pendingMassOrders() {
                BusinessOrderFty.pendingMassOrderService()
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
        }]);