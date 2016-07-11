/**
 * Created by jimmie on 2016/6/7.
 */

angular.module('withdraw.controller', ['withdraw.service', 'seller.session'])

    .controller('WithdrawController',['$scope','$state','$timeout','$stateParams','withdrawFty','BalanceSession','DWStatus',
        '$ocLazyLoad','withdrawBalance', function ($scope, $state, $timeout, $stateParams, withdrawFty, BalanceSession,DWStatus, $ocLazyLoad,withdrawBalance) {

            document.title = "提现佣金";

            getWithdrawAccount();
            getWithdrawHistory();


            $scope.balance = BalanceSession.balance;
            //console.log('Balance?'+$scope.balance);

            //获取个人信息
            function getWithdrawAccount() {

                withdrawFty.myAccountService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.withdraw = json.data[0];
                            //alert(angular.toJson($scope.withDraw))
                        }
                    }, function (error) {
                        $.toast('获取信息失败', 'cancel');
                    })
            }

            function getWithdrawHistory() {
                withdrawFty.getHistoryService()
                    .then(function(json) {
                        if (json.status_code == 0) {
                            $scope.withdraw_history = json.data;
                        }
                    }, function(error) {
                        $.toast('获取提现历史数据失败', 'cancel');
                    })
            }

            $scope.postDrawNum = function(){
                $ocLazyLoad.load('Jquery').then(function(){
                    $ocLazyLoad.load('JqueryWeUI').then(function(){
                        postDraw();
                    })
                })
            };


            //提交提现信息
            function postDraw() {

                var phone = $stateParams.accountPhone;
                var balance = withdrawBalance.balance;

                if(!balance > 0) {
                    $.toast.prototype.defaults.duration = 800;
                    $.toast('可提现的金额不足');
                    return;
                }

                if (phone == null) {
                    $.toast.prototype.defaults.duration = 800;
                    $.toast('需要设置手机号码');
                    $timeout(function () {
                        DWStatus.d_w_status = 2;
                        $state.go('distributionInfo');
                    }, 1000);
                    return;
                }

                var withdraw_account_id  = $scope.withdraw.id;
                var withdraw_cash        = $scope.withdraw.withdraw_cash;
                console.log(withdraw_account_id, withdraw_cash);

                if(withdraw_cash == undefined) {
                    $.toast('请输入提现金额');
                    return;
                }
                else if (withdraw_cash<100){
                    $.toast('提现金额少于100');
                    return;
                }
                else if(withdraw_cash>$scope.balance){
                    $.toast('提现金额超限');
                    return;
                }

                withdrawFty.postDrawService(withdraw_account_id,withdraw_cash)
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.withDraw= json.data;
                            $.toast.prototype.defaults = 1000;
                            $.toast('已提交');
                            $timeout(function(){
                                $state.go('home.sellerPage');
                            }, 1100);
                        }
                    }, function (error) {
                        $.toast('提现失败', 'cancel');
                    })
            }

    }]);