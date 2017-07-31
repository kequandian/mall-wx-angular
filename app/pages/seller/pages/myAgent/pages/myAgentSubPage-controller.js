
angular.module('myAgentSubPage.controller', ['myAgentSubPage.service'])
    /*
     * 经销团队
     * */
    .controller('CommissionPageController', ['$scope','$state','$filter','$stateParams', 'MyAgentSubPageFty',
        function ($scope,$state,$filter,$stateParams, MyAgentSubPageFty) {

            //title
            document.title = "提成明细";

            var register_date = localStorage['registerDate'];

            // 年月
            $scope.yearDefault = getDefaultYears();

            $scope.monDefault = getDefaultMons();

            $scope.thisYear = new Date().getYear() + 1900;
            $scope.thisMon = new Date().getMonth();
            $scope.year = $scope.thisYear;
            $scope.mon = $scope.thisMon;

            getPurchaseSummary($scope.year, $scope.mon);

            function getDefaultYears() {
                //var years = [
                //    {key: 2015, value: "2015年"},
                //    {key: 2016, value: "2016年"}
                //];

                var years = [];

                var registered = !(register_date === undefined || register_date == null || register_date.length == 0);
                var curYear = new Date().getYear() + 1900;
                var regDate = registered ? fixIOSDate(register_date) : new Date();
                var regYear = regDate.getYear() + 1900;

                if(isNaN(regDate)) {
                    years.push({key: 1900, value: register_date});
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

                var registered = !(register_date === undefined || register_date == null || register_date == 0);
                var regDate = registered ? fixIOSDate(register_date) : new Date();
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

            // 查询销售订单数据
            $scope.postOrder = function () {
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

                getPurchaseSummary(year, mon);
            };

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

                getPurchaseSummary(year, mon);
            };

            function getPurchaseSummary(year,month){

                var select_date = new Date(year, month);
                var select_dtae_format = $filter('date')(select_date,'yyyy-MM');

                //console.log("select_dtae_format: " + select_dtae_format);

                MyAgentSubPageFty.getPurchaseSummaryService(select_dtae_format)
                    .then(function(json){
                        if(json.status_code == 0){
                            console.log('我的推荐: ' + angular.toJson(json));
                            $scope.pirchase_summary = json.data[0];
                        }else{
                            $.toast('获取信息失败','cancel');
                            console.log(angular.toJson(json));
                        }

                    },function(error){
                        $.toast('获取信息失败','cancel');
                        console.log(angular.toJson(error));
                    })

            }

            //进入年终奖励对照表
            $scope.com_check_table_action = function(){
                $state.go('commissionPageLookupTable');
            };

            //进入订单明细
            $scope.com_check_table_data_action = function(){
                $state.go('commissionPageCheckTable');
            }
        }])

    /*
     * 年终奖励对照表
     * */
    .controller('CommissionLookupTableController', ['$scope','$state','$stateParams', 'MyAgentSubPageFty',
        function ($scope,$state,$stateParams, MyAgentSubPageFty) {

            document.title = "年终奖励对照表";

            initCode();

            function initCode(){
                getPhysicalProportion();
            }

            //获取线下经销商进货明细
            function getPhysicalProportion(){
                MyAgentSubPageFty.getPhysicalProportionService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.physical_proportion_list = json.data;
                            //console.log('获取比例对照表：' + angular.toJson(json))
                        }else{
                            console.log('获取比例对照表失败：' + angular.toJson(json))
                        }
                    }, function(error){
                        console.log('获取比例对照表失败：' + angular.toJson(error))
                    })
            }

            //组合格式
            $scope.convert_amount = function(min, max){
                if(max == -1){
                    return min + '元-以上';
                }else{
                    return min + '-' + max + '元';
                }
            }

        }])


    /*
     * 订单明细
     * */
    .controller('CommissionCheckTableController', ['$scope','$state','$stateParams', 'MyAgentSubPageFty',
        function ($scope,$state,$stateParams, MyAgentSubPageFty) {


            document.title = "订单明细";

            var seller_id = 0;

            initCode();

            function initCode(){
                //seller_id = $stateParams.sellerId;
                //getPurchaseJournal(seller_id)
            }

            //获取线下经销商进货明细
            function getPurchaseJournal(id){
                MyAgentSubPageFty.getPurchaseJournalService(id)
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.seller_product_list = json.data;
                            //console.log('获取进货明细：' + angular.toJson(json));
                        }else{
                            console.log('获取进货明细失败：' + angular.toJson(json));
                        }
                    }, function(error){
                        console.log('获取进货明细失败：' + angular.toJson(error));
                    })
            }

        }])


    /*
     * 结算明细
     * */
    .controller('ComPageSettlementRecordController', ['$scope','$state','$filter','UserInfo','MyAgentSubPageFty',
        function ($scope, $state,$filter,UserInfo,MyAgentSubPageFty) {

            document.title = "结算记录";

            console.log('UserInfo: ' + angular.toJson(UserInfo));

            // 年月
            $scope.yearDefault = getDefaultYears();

            $scope.monDefault = getDefaultMons();

            $scope.thisYear = new Date().getYear() + 1900;
            $scope.thisMon = new Date().getMonth();
            $scope.year = $scope.thisYear;
            $scope.mon = $scope.thisMon;

            getSettlementRecordInfo(null, null);
            //getSettlementRecordInfo($scope.year, $scope.mon);

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


            $scope.selectedYearAction = function () {
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

                //getSettlementRecordInfo(year, mon);
            };

            // 查询提现记录
            $scope.getExchangeRecordAction = function () {
                var year = $scope.year;
                var mon = $scope.mon;

                //getSettlementRecordInfo(year, mon);
            };

            function getSettlementRecordInfo(year, mon){

                /*var d_start_date = new Date(year, mon, 1);
                 var _end_date = new Date(year, mon + 1, 1);
                 var d_end_date = new Date(_end_date - 1);

                 // format date
                 var start_date = $filter('date')(d_start_date, 'yyyy-MM-dd');
                 var end_date = $filter('date')(d_end_date, 'yyyy-MM-dd');*/

                MyAgentSubPageFty.getSettlementRecordService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.settlement_record_list = json.data;
                            //console.log(angular.toJson(json))
                        }else{
                            console.log('获取结算明细失败: ' + angular.toJson(json));
                        }
                    }, function(error){
                        console.log('获取结算明细失败: ' + angular.toJson(error));
                    })
            }


            //支付方式
            $scope.pay_status = function(status){
                if(status == 'WECHAT'){
                    return '微信支付';
                }
            };

            //时间截取
            $scope.apply_time = function(time){
                var initTime = time.split(' ');
                return initTime[0];
            };

            //申请状态
            $scope.apply_status = function(status){

                if(status == 'APPLYING'){
                    return '申请中';
                }else if(status == 'REJECTED'){
                    return '被拒绝';
                }else if(status == 'HANDLING'){
                    return '处理中';
                }else if(status == 'COMPLETED'){
                    return '已完成';
                }
            };

            //时间格式转换
            $scope.convert_date = function(time){
                if(time != null){
                    var time_stamp = new Date(time.replace(/-/g, "/"));
                    var year = time_stamp.getFullYear();
                    var month = (time_stamp.getMonth()+1);
                    var day = time_stamp.getDate();
                    if(month < 10){
                        month = '0' + month;
                    }
                    if(day < 10){
                        day = '0' + day;
                    }
                    return year + '年' + month + '月份'
                }
            }


        }])
;