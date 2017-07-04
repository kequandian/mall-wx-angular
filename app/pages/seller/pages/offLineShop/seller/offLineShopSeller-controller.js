
angular.module('sellerTeam.controller', ['sellerTeam.service'])
    /*
     * 经销团队
     * */
    .controller('SellerTeamController', ['$scope', 'SellerTeamFty',
        function ($scope, SellerTeamFty) {

            //title
            document.title = "经销团队";
            myTeam();
            function myTeam(){
                SellerTeamFty.getOffLineSellerTeamsService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.my_team = json.data;
                            //console.log(angular.toJson(json.data));
                        }else{
                            console.log(angular.toJson(json.data));
                        }
                    }, function (error) {
                        $.toast('获取信息失败', 'cancel');
                        console.log(angular.toJson(error));
                    })
            }

        }])

    /*
     * 经销授权
     * */
    .controller('SellerAuthorizationController', ['$scope','$state','$stateParams','$timeout', 'SellerTeamFty',
        function ($scope,$state,$stateParams,$timeout, SellerTeamFty) {

            //title
            document.title = "经销授权";

            var isAgent = $stateParams.isAgent;
            var sellerType;
            var show_tips = document.getElementById('show_tips');

            if(isAgent != null){
                if(isAgent){
                    $scope.is_agent = isAgent;
                    $scope.action_text = '经销商授权';
                    $scope.init_placeholder_id = "要与被授权人的UID一致";
                    $scope.init_placeholder_name = "要与被授权人个人信息的姓名一致";
                    $scope.init_placeholder_phone = "要与被授权人个人信息的手机号一致";
                }else{
                    $scope.is_agent = isAgent;
                    $scope.action_text = '提交申请';
                    $scope.init_placeholder_id = "要与个人信息的ID号一致";
                    $scope.init_placeholder_name = "要与个人信息的姓名一致";
                    $scope.init_placeholder_phone = "要与个人信息的手机号一致";
                    //获取个人信息
                    getUserInfo();
                }

            }

            function getUserInfo() {

                SellerTeamFty.myInfoService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.userInfo = json.data;
                            //console.log(angular.toJson(json.data));
                            if(json.data.phone == null){
                                var tips_text = '您还没有设置手机号码，请到“积分中心→我的信息”进行设置';
                                /*$.confirm(tips_text, function() {
                                    //$state.go('distributionInfo');
                                }, function() {
                                    //点击取消后的回调函数
                                });*/
                                $.alert(tips_text, "提示");
                            }
                        }
                    }, function (error) {
                        $.toast('获取信息失败', 'cancel');
                    })
            }

            $scope.apply_action = function(uid, real_name, phone){

                sellerType = 'CROWN';

                if(!angular.isString(uid) || uid.length==0){
                    $.toast('ID不能为空', 'cancel');
                    return;
                }
                if(!angular.isString(real_name) || real_name.length==0){
                    $.toast('姓名不能为空', 'cancel');
                    return;
                }
                if(!angular.isString(phone) || phone==0){
                    $.toast('手机号不能为空', 'cancel');
                    return;
                }else if(!checkPhone($scope.userInfo.phone)){
                    $.toast('手机号码无效', 'cancel');
                    return;
                }

                if($scope.is_agent){

                    if(uid === undefined || uid == null || uid.length == 0){
                        $.toast('uid不能为空', 'cancel');
                        return;
                    }
                    authorize(uid,real_name,phone);
                }else{
                    apply(real_name,phone,sellerType);
                }

            };

            //为线下授权
            function authorize(uid,real_name,phone){
                SellerTeamFty.authorizeService(uid,real_name,phone)
                    .then(function(json){
                        if(json.status_code == 0){
                            $.toast('申请已提交,请等待审核');
                            $state.go('offLineShop');
                        }else{
                            $.toast.prototype.defaults.duration = 2000;
                            if (json.message == 'user.already.crownship') {
                                showTips("授权失败,该用户已经是皇冠级别");
                            }else if(json.message == "invalid.real_name"){
                                showTips("授权失败,真实姓名与被授权人个人信息上的不一致");
                            }else if(json.message == "real_name.is.empty"){
                                showTips("被授权人未填写个人信息，请到“积分中心，我的信息”填写后再授权");
                            }else if(json.message == "invalid.phone"){
                                showTips("授权失败,手机号码与被授权人个人信息上的不一致");
                            }else if(json.message == "apply.already.exist"){
                                showTips("您已提交授权，无需再提交");
                            }else {
                                $.toast('授权失败', 'cancel');
                            }
                            console.log(angular.toJson(json));
                        }
                    },function(error){
                        $.toast('授权失败', 'cancel');
                        console.log(angular.toJson(error));
                    })
            }

            //申请成为线下代理
            function apply(real_name,phone,sellerType){
                SellerTeamFty.applyService(real_name,phone,sellerType)
                    .then(function(json){
                        if(json.status_code == 0){
                            $.toast('申请已提交,请等待审核');
                            $state.go('sellerPage');
                        }else{
                            $.toast('申请失败', 'cancel');
                            console.log(angular.toJson(json));
                        }
                    },function(error){
                        $.toast('申请失败', 'cancel');
                        console.log(angular.toJson(error));
                    })
            }

            function checkPhone(str){
                var isphone = /^((\+|0)86)?\d{11}$/.test(str);
                return isphone;
            }

            //show tips
            function showTips(content){
                show_tips.style.display = 'block';
                $scope.tips_text = content;
                $timeout(function () {
                    show_tips.style.display = 'none';
                }, 4000);
            }


        }])

    /*
     * 我的推荐
     * */
    .controller('MyRecommendController', ['$scope','$state','$filter', 'SellerTeamFty','UserInfo',
        function ($scope,$state,$filter, SellerTeamFty, UserInfo) {

            //title
            document.title = "我的推荐";

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

            var defaultMons = [
                {key: 0, value: "01月"},
                {key: 1, value: "02月"},
                {key: 2, value: "03月"},
                {key: 3, value: "04月"},
                {key: 4, value: "05月"},
                {key: 5, value: "06月"},
                {key: 6, value: "07月"},
                {key: 7, value: "08月"},
                {key: 8, value: "09月"},
                {key: 9, value: "10月"},
                {key: 10, value: "11月"},
                {key: 11, value: "12月"}
            ];

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

                SellerTeamFty.getPurchaseSummaryService(select_dtae_format)
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

            //show coupon list
            $scope.show_list = {
                isShow:false
            };
            $scope.toggle_order_item_list = function(show_list){
                if(show_list.isShow === undefined){
                    return;
                }
                show_list.isShow = !show_list.isShow;
            };
            $scope.show_order_item_list = function(show_list){
                if(show_list.isShow === undefined){
                    return;
                }
                return show_list.isShow;
            };

            //查看比例对照表
            $scope.check_table_action = function(){
                $state.go('lookupTable');
            };

            //查看明细
            $scope.check_table_data_action = function(item){
                //console.log(item.seller_id)
                $state.go('checkTableData',{sellerId: item.seller_id});
            }

        }])

     /*
     * 提现申请
     * */
    .controller('WithdrawApplyController', ['$scope','$state', 'SellerTeamFty',
        function ($scope,$state, SellerTeamFty) {

            //title
            document.title = "提现申请";

            $scope.accountInfo={};

            $scope.withdraw_apply_action = function(accountInfo){

                if(validate_date(accountInfo)){

                    accountInfo.amount = parseFloat(accountInfo.amount);

                    SellerTeamFty.postWidthApplyService(accountInfo)
                        .then(function(json){

                            if(json.status_code == 0){
                                $.toast('提现申请成功');
                                $state.go('offLineShop')
                            }else{
                                $.toast('提现申请失败','cancel');
                            }

                        }, function(error){
                            $.toast('提现申请失败','cancel');
                            console.log(angular.toJson(error));
                        })
                }
            };

            function validate_date(accountInfo){

                var accountName = accountInfo.account_name;
                var accountNumber = accountInfo.account_number;
                var bankName = accountInfo.bank_name;
                var amount = parseFloat(accountInfo.amount);

                if(!angular.isString(accountName) || accountName.length==0){
                    $.toast('姓名不能为空', 'cancel');
                    return false;
                }
                if(!angular.isString(accountNumber) || accountNumber.length==0){
                    $.toast('卡号不能为空', 'cancel');
                    return false;
                }

                var valiCardnumber = /^(\d{16}|\d{19})$/;

                if(!valiCardnumber.test(accountNumber)){
                    $.toast('请输入正确的卡号', 'cancel');
                    return false;
                }

                if(!angular.isString(bankName) || bankName.length==0){
                    $.toast('开户行不能为空', 'cancel');
                    return false;
                }
                if(!angular.isNumber(amount) || amount.length==0){
                    $.toast('金额不能为空', 'cancel');
                    return false;
                }
                var v_monye = /^\d+(?=\.{0,1}\d+$|$)/; //正数

                if(!v_monye.test(amount)){
                    $.toast('金额应为正数', 'cancel');
                    return false;
                }

                if(!amount > 0){
                    $.toast('金额应大于零', 'cancel');
                    return false;
                }
                return true;
            }

        }])

    /*
     * 提现记录
     * */
    .controller('OffLineExchangeRecordController', ['$scope','$state','$filter','UserInfo','SellerTeamFty',
        function ($scope, $state,$filter,UserInfo,SellerTeamFty) {

        document.title = "提现记录";

        //console.log(angular.toJson(UserInfo));

        // 年月
        $scope.yearDefault = getDefaultYears();

        $scope.monDefault = getDefaultMons();

        $scope.thisYear = new Date().getYear() + 1900;
        $scope.thisMon = new Date().getMonth();
        $scope.year = $scope.thisYear;
        $scope.mon = $scope.thisMon;

        getExchangeRecordInfo($scope.year, $scope.mon);

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

            getExchangeRecordInfo(year, mon);
        };

        // 查询提现记录
        $scope.getExchangeRecordAction = function () {
            var year = $scope.year;
            var mon = $scope.mon;

            getExchangeRecordInfo(year, mon);
        };

        function getExchangeRecordInfo(year, mon){

            var d_start_date = new Date(year, mon, 1);
            var _end_date = new Date(year, mon + 1, 1);
            var d_end_date = new Date(_end_date - 1);

            // format date
            var start_date = $filter('date')(d_start_date, 'yyyy-MM-dd');
            var end_date = $filter('date')(d_end_date, 'yyyy-MM-dd');

            SellerTeamFty.getExchangeRecordService(start_date,end_date)
                .then(function(json){
                    if(json.status_code == 0){
                        $scope.exchange_record_list = json.data;
                        //console.log(angular.toJson(json))
                    }else{
                        $.toast('获取记录失败', 'cancel');
                        console.log('获取记录失败: ' + angular.toJson(json));
                    }
                }, function(error){
                    $.toast('获取记录失败', 'cancel');
                    console.log('获取记录失败: ' + angular.toJson(error));
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

    }])

    /*
     * 结算记录
     * */
    .controller('SettlementRecordController', ['$scope','$state','$filter','UserInfo','SellerTeamFty',
        function ($scope, $state,$filter,UserInfo,SellerTeamFty) {

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

                SellerTeamFty.getSettlementRecordService()
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

    /*
     * 经销商申请须知
     * */
    .controller('ApplynoticeController', ['$scope','$state','$stateParams','$ocLazyLoad','$rootScope', 'SellerTeamFty',
        function ($scope,$state,$stateParams,$ocLazyLoad,$rootScope, SellerTeamFty) {

            document.title = '申请须知';

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    //console.log("Applynotice:jquery loaded");
                })
            });
            //自动关闭pcd控件
            var scope1 = $rootScope;
            scope1.$watch('closePCD',function(nValue, oValue){
                $('.close-picker').click();
                $('#city-picker').click();
            });

            var recommender_id = $stateParams.recommenderId;
            //var recommender_name = $stateParams.recommenderName;
            var type_status = $stateParams.typeStatus;
            var apply_status = $stateParams.applyStatus;

            initCode();

            function initCode(){
                getUserInfo();
                //getOwnerLevel();
            }

            function getApplyNotice(){
                var type;
                if(type_status == 'crown'){
                    console.log('CROWN须知')
                    type = 'CROWN';
                }else if(type_status == 'star'){
                    console.log('STAR须知')
                    type = 'STAR';
                }
                SellerTeamFty.getApplyNoticeService(type)
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.apply_notice = json.data;
                            //console.log('获取申请须知：' + angular.toJson(json))
                        }else{
                            console.log('获取申请须知失败：' + angular.toJson(json))
                        }
                    }, function(error){
                        console.log('获取申请须知失败：' + angular.toJson(error))
                    })
            }

            function getOwnerLevel(){

                SellerTeamFty.ownerBalanceService()
                    .then(function(json){
                        if(json.status_code == 0){

                            //console.log('获取级别信息：' + angular.toJson(json))

                            if(json.data.is_crown && json.data.is_physical){
                                $scope.youIsCrown = true;
                                $scope.youIsNotCrown = false;
                            }else{
                                $scope.youIsCrown = false;
                                $scope.youIsNotCrown = true;
                                getApplyNotice();
                            }
                            //$scope.youIsNotCrown = true;
                            //getApplyNotice();
                        }else{
                            console.log('获取级别信息失败：' + angular.toJson(json))
                        }
                    }, function(error){
                        console.log('获取级别信息失败：' + angular.toJson(error))
                    })
            }

            function getUserInfo(){
                SellerTeamFty.myInfoService()
                    .then(function(json){
                        if(json.status_code == 0){
                            //console.log('个人信息：' + angular.toJson(json))
                             if(recommender_id == json.data.uid){
                                $.alert("不能推荐自己申请皇冠经销商", "提示", function(){
                                    $state.go('home.homePage');
                                });
                             }else{
                                 getOwnerLevel();
                             }
                            //getOwnerLevel();
                        }else{
                            console.log('获取个人信息失败：' + angular.toJson(json));
                        }
                    }, function(error){
                        console.log('获取个人信息失败：' + angular.toJson(error));
                    })
            }

            //确认按钮
            $scope.ok_action = function(){
                $state.go('applyauth',
                    {
                        recommenderId: recommender_id,
                        typeStatus: type_status,
                        applyStatus: apply_status
                    });
            };

            //取消按钮
            $scope.cancel_action = function(){
                $state.go('authorizationPage');
            }




    }])

    /*
     * 皇冠、星级经销商授权
     * */
    .controller('CrownSellerAuthenticationController', ['$scope','$state','$stateParams','$timeout','$ocLazyLoad',
        '$location','$window','SellerTeamFty',
        function ($scope,$state,$stateParams,$timeout,$ocLazyLoad,$location,$window, SellerTeamFty) {

            document.title = '授权申请';

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    //console.log("Applynotice:jquery loaded");
                })
            });

            var recommender_id = $stateParams.recommenderId;
            //var recommender_name = $stateParams.recommenderName;
            var type_status = $stateParams.typeStatus;
            var apply_status = $stateParams.applyStatus;
            var show_tips = document.getElementById('show_tips');

            $scope.userInfo = {};
            $scope.action_text = '提交授权申请';
            $scope.is_crown = false;
            $scope.is_star = false;
            $scope.is_own = false;
            var is_followed;
            AllPCD();//获取省市区

            if(type_status != null){
                if(type_status == 'crown'){
                    console.log("线下皇冠经销商授权");
                    document.title = "线下皇冠经销商授权";
                    $scope.apply_type_tips = autoWordWrap(SellerTeamFty.getCrownTips());
                    $scope.is_crown = true;

                    if(apply_status == 'own'){
                        console.log('me');
                        $scope.is_own = false;
                        $scope.init_placeholder_id = "要与个人信息的ID号一致";
                        $scope.init_placeholder_name = "要与个人信息的姓名一致";
                        $scope.init_placeholder_phone = "要与个人信息的手机号一致";
                    }else if(apply_status == 'rec'){
                        console.log('not me');
                        $scope.is_own = true;
                        $scope.userInfo.recommender_id = recommender_id;
                        //$scope.userInfo.recommender_name = recommender_name;
                        $scope.init_placeholder_id = "要与被授权人的UID一致";
                        $scope.init_placeholder_name = "要与被授权人个人信息的姓名一致";
                        $scope.init_placeholder_phone = "要与被授权人个人信息的手机号一致";
                    }

                }else if(type_status == 'star'){
                    console.log("线下星级经销商授权");
                    document.title = "线下星级经销商授权";
                    $scope.apply_type_tips = autoWordWrap(SellerTeamFty.getStarTips());
                    $scope.is_star = true;
                    $scope.is_own = true;
                    $scope.userInfo.recommender_id = recommender_id;
                    //$scope.userInfo.recommender_name = recommender_name;
                    $scope.init_placeholder_id = "要与被授权人的UID一致";
                    $scope.init_placeholder_name = "要与被授权人个人信息的姓名一致";
                    $scope.init_placeholder_phone = "要与被授权人个人信息的手机号一致";
                }
                getUserInfo();
            }


            //处理换行
            function autoWordWrap(content){
                var newContent = content.replace(/\n/g, '<br />');
                return '<div>'+newContent+'</div>';
            }


            function getUserInfo(){
                SellerTeamFty.myInfoService()
                    .then(function(json){
                        if(json.status_code == 0){
                            //console.log('个人信息：' + angular.toJson(json))

                            $scope.userInfo.uid = json.data.uid;
                            $scope.userInfo.real_name = json.data.real_name;
                            $scope.userInfo.phone = json.data.phone;
                            is_followed = json.data.followed;
                        }else{
                            console.log('获取个人信息失败：' + angular.toJson(json));
                        }
                    }, function(error){
                        console.log('获取个人信息失败：' + angular.toJson(error));
                    })
            }

            $scope.apply_action = function(userInfo){

                var recommenderId = userInfo.recommender_id;
                var uid = userInfo.uid;
                var real_name = userInfo.real_name;
                var phone = userInfo.phone;

                var pcd_info = document.getElementById('city-picker');

                if(!angular.isString(uid) || uid.length==0){
                    $.toast('ID不能为空', 'cancel');
                    return;
                }
                if(!angular.isString(real_name) || real_name.length==0){
                    $.toast('姓名不能为空', 'cancel');
                    return;
                }
                if(!angular.isString(phone) || phone==0){
                    $.toast('手机号不能为空', 'cancel');
                    return;
                }else if(!checkPhone($scope.userInfo.phone)){
                    $.toast('手机号码无效', 'cancel');
                    return;
                }

                if(uid === undefined || uid == null || uid.length == 0){
                    $.toast('uid不能为空', 'cancel');
                    return;
                }

                if(pcd_info.value === undefined || pcd_info.value == null || pcd_info.value == ''){
                    $.toast('请设置地区', 'cancel');
                    return;
                }

                var pcd_list = pcd_info.value.split(' ');
                var apply_code = {};
                apply_code.real_name = real_name;
                apply_code.phone = phone;
                apply_code.province = pcd_list[0];
                apply_code.city = pcd_list[1];
                apply_code.district = pcd_list[2];

                //console.log(angular.toJson(apply_code));
                //return;


                if(type_status == 'crown'){
                    if(apply_status == 'own'){
                        console.log('自己申请皇冠经销商');
                        apply_code.type = 'CROWN';
                        ownCrownSeller(apply_code);
                    }else if(apply_status == 'rec'){
                        console.log('推荐申请皇冠经销商');
                        apply_code.uid = recommenderId;
                        apply_code.type = 'CROWN';
                        recommendCrownSeller(apply_code);
                    }
                }else if(type_status == 'star'){
                    console.log('推荐申请星级经销商');
                    apply_code.uid = recommenderId;
                    recommendCrownSeller(apply_code);
                }

            };

            function checkPhone(str){
                var isphone = /^((\+|0)86)?\d{11}$/.test(str);
                return isphone;
            }

            //皇冠，星级经销申请--recommend
            function recommendCrownSeller(apply_code){
                SellerTeamFty.recommendCrownSellerService(apply_code)
                    .then(function(json){
                        if(json.status_code == 0){


                            if(angular.isString(json.message)){
                                if(json.message == 'apply.success'){
                                    if(is_followed != 0){
                                        var follow_us_url = SellerTeamFty.getFollowUsUrl();
                                        if(follow_us_url != null && follow_us_url != ""){
                                            $.alert("请关注公众号完成授权申请", "提示", function(){
                                                $window.location.href = follow_us_url;
                                            });
                                        }else{
                                            $.alert("请关注公众号完成授权申请", "提示", function(){
                                                $state.go('home.homePage');
                                            });
                                        }
                                    }else{
                                        $.toast('申请已提交,请等待审核');
                                        $state.go('home.sellerPage');
                                    }
                                }else{

                                    $.alert("您的授权申请已提交人工审核，请耐心等待", "提示", function(){
                                        $state.go('home.homePage');
                                    });
                                }
                            }else{
                                console.log('message is null');
                            }


                        }else{
                            $.toast.prototype.defaults.duration = 2000;
                            if (json.message == 'user.already.crownship') {
                                showTips("授权失败,该用户已经是皇冠级别");
                            }else if(json.message == "invalid.real_name"){
                                showTips("授权失败,真实姓名与被授权人个人信息上的不一致");
                            }else if(json.message == "real_name.is.empty"){
                                showTips("被授权人未填写个人信息，请到“积分中心，我的信息”填写后再授权");
                            }else if(json.message == "invalid.phone"){
                                showTips("授权失败,手机号码与被授权人个人信息上的不一致");
                            }else if(json.message == "apply.already.exist"){
                                showTips("您已提交授权，无需再提交");
                            }else {
                                $.toast('授权失败', 'cancel');
                            }
                            console.log(angular.toJson(json));
                        }
                    },function(error){
                        $.toast('授权失败', 'cancel');
                        console.log(angular.toJson(error));
                    })
            }

            //皇冠经销申请--own
            function ownCrownSeller(apply_code){
                SellerTeamFty.applyService(apply_code.real_name,apply_code.phone,apply_code.type)
                    .then(function(json){
                        if(json.status_code == 0){

                            if(angular.isString(json.message)){
                                if(json.message == 'apply.success'){
                                    if(is_followed != 0){
                                        var follow_us_url = SellerTeamFty.getFollowUsUrl();
                                        if(follow_us_url != null && follow_us_url != ""){
                                            $.alert("请关注公众号完成授权申请", "提示", function(){
                                                $window.location.href = follow_us_url;
                                            });
                                        }else{
                                            $.alert("请关注公众号完成授权申请", "提示", function(){
                                                $state.go('home.homePage');
                                            });
                                        }
                                    }else{
                                        $.toast('申请已提交,请等待审核');
                                        $state.go('home.sellerPage');
                                    }
                                }else{
                                    $.alert("您的授权申请已提交人工审核，请耐心等待", "提示", function(){
                                        $state.go('home.homePage');
                                    });
                                }

                            }else {
                                console.log('message is null');
                            }
                        }else{
                            $.toast.prototype.defaults.duration = 2000;
                            if (json.message == 'user.already.crownship') {
                                showTips("申请失败,该用户已经是皇冠级别");
                            }else if(json.message == "invalid.real_name"){
                                showTips("申请失败,真实姓名与个人信息上的不一致");
                            }else if(json.message == "real_name.is.empty"){
                                showTips("申请人未填写个人信息，请到“积分中心，我的信息”填写后再申请");
                            }else if(json.message == "invalid.phone"){
                                showTips("申请失败,手机号码与个人信息上的不一致");
                            }else if(json.message == "apply.already.exist"){
                                showTips("您已提交授权，无需再提交");
                            }else {
                                $.toast('申请失败', 'cancel');
                            }
                            console.log(angular.toJson(json));
                        }
                    },function(error){
                        $.toast('申请失败', 'cancel');
                        console.log(angular.toJson(error));
                    })
            }

            //show tips
            function showTips(content){
                show_tips.style.display = 'block';
                $scope.tips_text = content;
                $timeout(function () {
                    show_tips.style.display = 'none';
                }, 4000);
            }


            /*
             * 获取省市区
             * */
            function AllPCD() {
                SellerTeamFty.getAuthPCDService()
                    .then(function (result) {
                        //$scope.provinces = result.data;
                        if(result.status_code == 0){
                            pcd = result.data;
                            showPCD();
                        }else{
                            console.log('获取省市区失败：' + angular.toJson(result));
                        }
                    }, function (error) {
                        console.log('获取省市区失败：' + angular.toJson(error));
                    })
            }

            function showPCD() {
                // jshint ignore: start
                +function ($) {

                    $.rawCitiesData = pcd;
                    //console.log(pcd);

                }($);
                // jshint ignore: end

                /* global $:true */
                /* jshint unused:false*/

                +function ($) {
                    "use strict";

                    var defaults;

                    $.fn.cityPicker = function (params) {
                        params = $.extend({}, defaults, params);
                        return this.each(function () {

                            var format = function (data) {
                                var result = [];
                                for (var i = 0; i < data.length; i++) {
                                    var d = data[i];
                                    if (d.name === "请选择") continue;
                                    result.push(d.name);
                                }
                                if (result.length) return result;
                                return [""];
                            };

                            var area_list = function (data) {
                                if (!data.area_list) return [""];
                                return format(data.area_list);
                            };

                            var getCities = function (d) {
                                for (var i = 0; i < raw.length; i++) {
                                    if (raw[i].name === d) return area_list(raw[i]);
                                }
                                return [""];
                            };

                            var getDistricts = function (p, c) {
                                for (var i = 0; i < raw.length; i++) {
                                    if (raw[i].name === p) {
                                        for (var j = 0; j < raw[i].area_list.length; j++) {
                                            if (raw[i].area_list[j].name === c) {
                                                return area_list(raw[i].area_list[j]);
                                            }
                                        }
                                    }
                                }
                                return [""];
                            };

                            var raw = $.rawCitiesData;
                            var provinces = raw.map(function (d) {
                                return d.name;
                            });
                            var initCities = area_list(raw[0]);
                            var initDistricts = area_list(raw[0].area_list[0]);

                            var currentProvince = provinces[0];
                            var currentCity = initCities[0];
                            var currentDistrict = initDistricts[0];

                            var cols = [
                                {
                                    values: provinces,
                                    cssClass: "col-province"
                                },
                                {
                                    values: initCities,
                                    cssClass: "col-city"
                                }
                            ];

                            if (params.showDistrict) cols.push({
                                values: initDistricts,
                                cssClass: "col-district"
                            });

                            var config = {

                                cssClass: "city-picker",
                                rotateEffect: false,  //为了性能

                                onChange: function (picker, values, displayValues) {
                                    var newProvince = picker.cols[0].value;
                                    var newCity;
                                    if (newProvince !== currentProvince) {
                                        var newCities = getCities(newProvince);
                                        newCity = newCities[0];
                                        var newDistricts = getDistricts(newProvince, newCity);
                                        picker.cols[1].replaceValues(newCities);
                                        if (params.showDistrict) picker.cols[2].replaceValues(newDistricts);
                                        currentProvince = newProvince;
                                        currentCity = newCity;
                                        picker.updateValue();
                                        return;
                                    }
                                    if (params.showDistrict) {
                                        newCity = picker.cols[1].value;
                                        if (newCity !== currentCity) {
                                            picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
                                            currentCity = newCity;
                                            picker.updateValue();
                                        }
                                    }
                                },

                                cols: cols
                            };

                            if (!this) return;
                            var p = $.extend(config, params);
                            //计算value
                            var val = $(this).val();
                            if (val) {
                                p.value = val.split(" ");
                                if (p.value[0]) {
                                    currentProvince = p.value[0];
                                    p.cols[1].values = getCities(p.value[0]);
                                }

                                if (p.value[1]) {
                                    currentCity = p.value[1];
                                    params.showDistrict && (p.cols[2].values = getDistricts(p.value[0], p.value[1]));
                                } else {
                                    currentDistrict = p.value[2];
                                    params.showDistrict && (p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]));
                                }
                            }
                            $(this).picker(p);
                        });
                    };

                    defaults = $.fn.cityPicker.prototype.defaults = {
                        showDistrict: true //是否显示地区选择
                    };

                }($);
            }

            //判断是否为苹果
            var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE')!= -1;

            // 元素失去焦点隐藏iphone的软键盘
            function objBlur(id,time){
                if(typeof id != 'string') throw new Error('objBlur()参数错误');
                var obj = document.getElementById(id),
                    time = time || 500,
                    docTouchend = function(event){
                        if(event.target!= obj){
                            setTimeout(function(){
                                obj.blur();
                                document.removeEventListener('touchend', docTouchend,false);
                            },time);
                        }
                    };
                if(obj){
                    obj.addEventListener('focus', function(){
                        document.addEventListener('touchend', docTouchend,false);
                    },false);
                }else{
                    throw new Error('objBlur()没有找到元素');
                }
            }

            //隐藏键盘
            $scope.keyboard_hidden_auth = function(){

                document.getElementById('city-picker').blur();

                var userInput = document.getElementById('contact_user');
                userInput.blur();
                var phoneInput = document.getElementById('contact_phone');
                phoneInput.blur();
                var contactInput = document.getElementById('contact_detail');
                contactInput.blur();

                if(isIPHONE){
                    var input1 = new objBlur('contact_user');
                    input1=null;
                    var input2 = new objBlur('contact_phone');
                    input2=null;
                    var input3 = new objBlur('contact_detail');
                    input3=null;
                }
            };

    }])

    /*
     * 我的推荐-比例对照表
     * */
    .controller('LookupTableController', ['$scope','$state','$stateParams', 'SellerTeamFty',
        function ($scope,$state,$stateParams, SellerTeamFty) {

            document.title = "比例对照表";

            initCode();

            function initCode(){
                getPhysicalProportion();
            }

            //获取线下经销商进货明细
            function getPhysicalProportion(){
                SellerTeamFty.getPhysicalProportionService()
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
     * 我的推荐-查看明细
     * */
    .controller('CheckTableDataController', ['$scope','$state','$stateParams', 'SellerTeamFty','UserInfo',
        function ($scope,$state,$stateParams, SellerTeamFty) {


            document.title = "进货明细";

            var seller_id = 0;

            initCode();

            function initCode(){
                seller_id = $stateParams.sellerId;
                getPurchaseJournal(seller_id)
            }

            //获取线下经销商进货明细
            function getPurchaseJournal(id){
                SellerTeamFty.getPurchaseJournalService(id)
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
     * 申请经销商二维码
     * */
    .controller('AuthorizationQRCodeController', ['$scope','$state','$stateParams', 'SellerTeamFty',
        function ($scope,$state,$stateParams, SellerTeamFty) {


            document.title = "申请二维码";

            var recommender_id = null;
            //var recommender_name = null;
            var type_status = null;
            var apply_status = null;
            $scope.isCrownApply = '请通知被授权人扫码加入';

            initCode();

            function initCode(){
                recommender_id = $stateParams.recommenderId;
                //recommender_name = $stateParams.recommenderName;
                type_status = $stateParams.typeStatus;
                apply_status = $stateParams.applyStatus;
                if(type_status == 'crown'){
                    $scope.isCrownApply = '请通知被授权人扫码加入皇冠经销商';
                }else if(type_status == 'star'){
                    $scope.isCrownApply = '请通知被授权人扫码加入星级经销商';
                }
                initQrcode();
            }

            function initQrcode(){
                var fallbackRUL = null;
                var localURL = window.location.href;
                var newurl = null;
                var newLocalURL = null;
                var params = null;
                if(localURL.indexOf('?') >= 0){

                    params = window.location.href.split('?');
                    var longParam = params[1];
                    var param = longParam.split('#')[0];
                    param = param + '&fallback=applynotice-'+ recommender_id +'-'+ type_status +'-'+ apply_status;
                    newurl = '?' + param;

                    newLocalURL = params[0] + newurl;

                    /*if(type_status == 'crown'){
                     param = param + '&fallback=applynotice-'+ recommender_id +'-'+ apply_status +'-'+ type_status;
                     }else if(type_status == 'star'){
                     param = param + '&fallback=applynotice-'+ recommender_id +'-'+ apply_status +'-'+ type_status;
                     }*/
                }else{
                    params = window.location.href.split('#');
                    newurl = '?fallback=applynotice-'+ recommender_id +'-'+ type_status +'-'+ apply_status;
                    newLocalURL = params[0] + newurl;
                    /*if(type_status == 'crown'){
                        fallbackRUL = '?fallback=applynotice-'+ recommender_id +'-'+ apply_status +'-'+ type_status;
                    }else if(type_status == 'star'){
                        fallbackRUL = '?fallback=applynotice-'+ recommender_id +'-'+ apply_status +'-'+ type_status;
                    }*/
                }

                var divhtml = document.getElementById("dituContent");
                var invitationUrl = newLocalURL;
                loadScript("lib/qrcodejs/qrcode.min.js", function () {

                    var qrcode = new QRCode(divhtml, {
                        text: invitationUrl,
                        width: 220,
                        height: 220,
                        correctLevel : QRCode.CorrectLevel.H
                    });
                    //qrcode.clear();
                    //qrcode.makeCode(invitationUrl);
                    //console.log("invitationUrl: " + invitationUrl);
                });
            }

            function loadScript(src, callback) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                if (callback)script.onload = callback;

                var sc = document.getElementsByTagName("head")[0];
                sc.appendChild(script);
                script.src = src;
            }


    }])


;