/**
 * Created by jimmie on 2016/6/7.
 */

angular.module('withdraw.controller', ['withdraw.service', 'seller.session'])

    .controller('WithdrawController',['$scope','$state','$timeout','$stateParams','withdrawFty','BalanceSession','DWStatus',
        '$ocLazyLoad','withdrawBalance', 'PointRate','MinWithdraw',
        function ($scope, $state, $timeout, $stateParams, withdrawFty, BalanceSession,DWStatus, $ocLazyLoad, withdrawBalance, PointRate, MinWithdraw) {

            document.title = "积分兑现";

            getWithdrawAccount();
            getWithdrawHistory();


            // config
            $scope.point_rate = PointRate.rate;
            $scope.min_withdraw = MinWithdraw.value;

            var min_withdraw_point = MinWithdraw.value * PointRate.rate;


            // personal balance
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
                if (phone == null) {
                    $.toast.prototype.defaults.duration = 800;
                    $.toast('需要设置手机号码', 'cancel');
                    $timeout(function () {
                        DWStatus.d_w_status = 2;
                        $state.go('distributionInfo');
                    }, 1000);
                    return;
                }


                //积分
                var balance = $scope.balance * PointRate.rate;

                if(! (balance > 0) ) {
                    $.toast.prototype.defaults.duration = 800;
                    $.toast('没有可兑现的积分', 'cancel');
                    return;
                }


                var withdraw_account_id  = $scope.withdraw.id;
                var withdraw_cash        = $scope.withdraw.withdraw_cash;
                //console.log(withdraw_account_id, withdraw_cash);


                if(withdraw_cash == undefined) {
                    $.toast('请输入要兑现的积分', 'cancel');
                    return;
                }
                else if (withdraw_cash < min_withdraw_point){
                    $.toast('积分不足 ' + min_withdraw_point, 'cancel');
                    return;
                }
                else if(withdraw_cash> balance){
                    $.toast('没有足够的积分可兑现', 'cancel');
                    return;
                }

                //feature: point
                var real_withdraw_cash  = withdraw_cash / PointRate.rate;

                withdrawFty.postDrawService(withdraw_account_id, real_withdraw_cash)
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.withDraw= json.data;
                            $.toast.prototype.defaults = 1000;
                            $.toast('已提交');
                            $timeout(function(){
                                $state.go('home.sellerPage');
                            }, 1100);

                            // update BalanceSession
                            BalanceSession.balance -= real_withdraw_cash;
                        }else{
                            $.toast('兑现失败', 'cancel');
                            console.log('兑现失败: ' + angular.toJson(json));
                        }
                    }, function (error) {
                        $.toast('兑现失败', 'cancel');
                        console.log('兑现失败: ' + angular.toJson(error));
                    })
            }

            //检查积分是否产出范围
            $scope.check_point = function(){
                var withdraw_cash        = $scope.withdraw.withdraw_cash;
                //积分
                var balance = $scope.balance * PointRate.rate;

                if(withdraw_cash > balance){
                    $scope.withdraw.withdraw_cash = balance;
                }
            }

    }]);