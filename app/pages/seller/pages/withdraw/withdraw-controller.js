/**
 * Created by jimmie on 2016/6/7.
 */

angular.module('withdraw.controller', ['withdraw.service', 'seller.session'])

    .controller('WithdrawController',['$scope','$state','withdrawFty','BalanceSession',  function ($scope, $state, withdrawFty, BalanceSession) {

        document.title = "提现佣金";

        getWithdrawAccount();
        
        $scope.balance = BalanceSession.balance;
        //console.log('Balance?'+$scope.balance);

        //获取个人信息
        function getWithdrawAccount() {

            withdrawFty.myAccountService()
                .then(function (json) {
                    if (json.status_code == 0) {
                        $scope.withdraw = json.data;
                        //alert(angular.toJson($scope.withDraw))
                    }
                }, function (error) {
                    $.toast('获取信息失败', 'cancel');
                })
        }

        //提交提现信息
        $scope.postDrawNum = function () {
            var withdraw_account_id  = $scope.withdraw.withdraw_account_id;
            var withdraw_cash        = $scope.withdraw.withdraw_cash;
            console.log(withdraw_account_id, withdraw_cash);

            if(withdraw_cash<100){
                $.toast('提现金额少于100');
                return;
            }
            else if(withdraw_cash>$scope.balance){
                $.toast('提现金额超限');
                return;
            }
            else if(withdraw_cash = "undefined") {
                $.toast('请输入提现金额');
                return;
            }

            withdrawFty.postDrawService(withdraw_account_id,withdraw_cash)
                .then(function (json) { 
                    if (json.status_code == 0) {
                        $scope.withDraw= json.data;
                    }
                }, function (error) {
                    // $.toast('提现失败', 'cancel');
                })
        }

    }]);