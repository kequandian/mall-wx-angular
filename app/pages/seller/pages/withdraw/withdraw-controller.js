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

                var phone = withdrawBalance.phone;

                if (phone == -1 || phone === null || phone === undefined) {
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
            };

            //提现记录
            $scope.exchange_record_action = function(){
                $state.go('exchangeRecord');
            }



    }])


    //提现记录controller
    .controller('ExchangeRecordController',['$scope','$state','UserInfo',
        function ($scope, $state,UserInfo) {

            document.title = "记录明细";

            // 年月
            $scope.yearDefault = getDefaultYears();

            $scope.monDefault = getDefaultMons();

            $scope.thisYear = new Date().getYear() + 1900;
            $scope.thisMon = new Date().getMonth();
            $scope.year = $scope.thisYear;
            $scope.mon = $scope.thisMon;


            function getDefaultYears() {

                var years = [];

                var registered = !(UserInfo.register_date === undefined || UserInfo.register_date == null || UserInfo.register_date.length == 0);
                var curYear = new Date().getYear() + 1900;
                var regDate = registered ? fixIOSDate(UserInfo.register_date) : new Date();
                var regYear = regDate.getYear() + 1900;

                if(isNaN(regDate)) {
                    years.push({key: 1900, value: UserInfo.register_date});
                    years.push({key: curYear, value: curYear + '年'});
                }

                for (var y = regYear; y <= curYear; y++) {
                    years.push({key: y, value: y + '年'})
                }

                return years;
            }

            function getDefaultMons() {
                var mons = [];

                var now = new Date();
                var curYear = now.getYear() + 1900;
                var curMon = now.getMonth();
                var selectedYear = $scope.year ? $scope.year : curYear;

                //if (curYear != selectedYear) {
                //    return defaultMons;
                //}

                var registered = !(UserInfo.register_date === undefined || UserInfo.register_date == null || UserInfo.register_date.length == 0);
                var regDate = registered ? fixIOSDate(UserInfo.register_date) : new Date();
                var regMonth = regDate.getMonth();
                var regYear = regDate.getYear() + 1900;

                if(selectedYear == regYear){

                    if(curYear == regYear){
                        for (var m = regMonth; m <= curMon; m++) {
                            var mm = m + 1;
                            if (mm < 10) {
                                mm = '0' + mm;
                            }
                            mons.push({key: m, value: mm + "月"})
                        }
                    }else if(curYear > regYear){
                        for (var m1 = regMonth; m1 <= 11; m1++) {
                            var mm1 = m1 + 1;
                            if (mm1 < 10) {
                                mm1 = '0' + mm1;
                            }
                            mons.push({key: m1, value: mm1 + "月"})
                        }
                    }

                }else if(selectedYear == curYear){

                    for (var m2 = 0; m2 <= curMon; m2++) {
                        var mm2 = m2 + 1;
                        if (mm2 < 10) {
                            mm2 = '0' + mm2;
                        }
                        mons.push({key: m2, value: mm2 + "月"})
                    }

                }else{
                    for (var m3 = 0; m3 <= 11; m3++) {
                        var mm3 = m3 + 1;
                        if (mm3 < 10) {
                            mm3 = '0' + mm3;
                        }
                        mons.push({key: m3, value: mm3 + "月"})
                    }
                }

                return mons;
            }

            /// fix IOS date format issue
            function fixIOSDate(date_string){

                var reg_date = new Date(date_string);

                if(isNaN(reg_date)){
                    var date_s = date_string.replace(/\-/g, '/');
                    date_s = date_s.substr(0, 10);

                    reg_date = new Date(date_s);
                }

                return reg_date;
            }


            $scope.onSelectedYear = function () {
                /// set curMon
                $scope.monDefault = getDefaultMons();
                var year = $scope.year;
                //var mon = $scope.mon;

                if ($scope.year == $scope.thisYear) {
                    var curMon = new Date().getMonth();
                    if ($scope.mon > curMon) {
                        $scope.mon = curMon;
                    }
                }else{
                    var firstMon = $scope.monDefault[0].key;
                    if($scope.mon < firstMon){
                        $scope.mon = firstMon;
                    }
                }
                var mon = $scope.mon;

            };

            // 查询提现记录
            $scope.getExchangeRecordList = function () {
                var year = $scope.year;
                var mon = $scope.mon;

                var d_start_date = new Date(year, mon, 1);
                var _end_date = new Date(year, mon + 1, 1);
                var d_end_date = new Date(_end_date - 1);

                // format date
                var start_date = $filter('date')(d_start_date, 'yyyy-MM-dd');
                var end_date = $filter('date')(d_end_date, 'yyyy-MM-dd');


                console.log("year: " + year);
                console.log("mon: " + mon);


            };



    }]);