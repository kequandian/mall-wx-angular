/**
 * Created by jimmie on 2016/6/7.
 */

angular.module('withDraw.controller', ['withDraw.service'])

    .controller('WithDrawController',['$scope','$state','withDrawMon','allowNum',  function ($scope, $state, withDrawMon, allowNum) {

        document.title = "提现佣金";

        getWithDrawAccount();
        
        $scope.allowNum = allowNum.allowNum;

        //获取个人信息
        function getWithDrawAccount() {

            withDrawMon.myAccountService()
                .then(function (json) {
                    if (json.status_code == 0) {
                        $scope.withDraw = json.data;
                        //alert(angular.toJson($scope.withDraw))
                    }
                }, function (error) {
                    $.toast('获取信息失败', 'cancel');
                })
        }

        //提交提现信息
        $scope.postDrawNum = function () {
            var withdraw_account_id  = $scope.withDraw.withdraw_account_id;
            var withdraw_cash        = $scope.withDraw.withdraw_cash;
            console.log(withdraw_account_id, withdraw_cash);

            check();

            function check() {
                if(withdraw_cash>0 && withdraw_cash<100){
                    // alert("提现金额少于100");
                    $.toast('提现金额少于100');

                }
                else if(withdraw_cash>allowNum.allowNum){
                    // alert("提现金额超限");
                    $.toast('提现金额超限');

                }
                else if(withdraw_cash = "undefined") {
                    // alert("请输入提现金额");
                    $.toast('请输入提现金额');


                }
            }

            withDrawMon.postDrawService(withdraw_account_id,withdraw_cash)
                .then(function (json) { 
                    if (json.status_code == 0) {
                        $scope.withDraw= json.data;
                    }
                }, function (error) {
                    // $.toast('提现失败', 'cancel');
                })
        }

    }]);