
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
                            //console.log('我的推荐: ' + angular.toJson(json));
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
     * 皇冠、星级经销商授权
     * */
    .controller('CrownSellerAuthenticationController', ['$scope','$state','$stateParams','$timeout', 'SellerTeamFty',
        function ($scope,$state,$stateParams,$timeout, SellerTeamFty) {


            var recommender_id = $stateParams.recommenderId;
            var recommender_name = $stateParams.recommenderName;
            var type_status = $stateParams.typeStatus;
            var apply_status = $stateParams.applyStatus;
            var show_tips = document.getElementById('show_tips');

            $scope.userInfo = {};
            $scope.action_text = '提交授权申请';
            $scope.is_crown = false;
            $scope.is_star = false;
            $scope.is_own = false;

            if(type_status != null){
                if(type_status == 'crown'){
                    console.log(1);
                    document.title = "线下皇冠经销商授权";
                    console.log("线下皇冠经销商授权");
                    $scope.is_crown = true;

                    if(apply_status == 'own'){
                        console.log('me');
                        $scope.is_own = false;
                        $scope.init_placeholder_id = "要与个人信息的ID号一致";
                        $scope.init_placeholder_name = "要与个人信息的姓名一致";
                        $scope.init_placeholder_phone = "要与个人信息的手机号一致";
                    }else if(apply_status == 'recommend'){
                        console.log('not me');
                        $scope.is_own = true;
                        $scope.userInfo.recommender_id = recommender_id;
                        $scope.userInfo.recommender_name = recommender_name;
                        $scope.init_placeholder_id = "要与被授权人的UID一致";
                        $scope.init_placeholder_name = "要与被授权人个人信息的姓名一致";
                        $scope.init_placeholder_phone = "要与被授权人个人信息的手机号一致";
                    }

                }else if(type_status == 'star'){
                    console.log(2);
                    document.title = "线下星级经销商授权";
                    console.log("线下星级经销商授权");
                    $scope.is_star = true;
                    $scope.is_own = true;
                    $scope.userInfo.recommender_id = recommender_id;
                    $scope.userInfo.recommender_name = recommender_name;
                    $scope.init_placeholder_id = "要与被授权人的UID一致";
                    $scope.init_placeholder_name = "要与被授权人个人信息的姓名一致";
                    $scope.init_placeholder_phone = "要与被授权人个人信息的手机号一致";
                }
                getUserInfo();
            }
            function getUserInfo(){
                SellerTeamFty.myInfoService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.userInfo.uid = json.data.uid;
                            //console.log('个人信息：' + angular.toJson(json))
                        }else{
                            console.log('获取个人信息失败：' + angular.toJson(json));
                        }
                    }, function(error){
                        console.log('获取个人信息失败：' + angular.toJson(error));
                    })
            }

            $scope.apply_action = function(userInfo){

                var uid = userInfo.uid;
                var real_name = userInfo.real_name;
                var phone = userInfo.phone;

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

                console.log(userInfo.recommender_id)
                console.log(userInfo.recommender_name)
                console.log(userInfo.uid)
                console.log(userInfo.real_name)
                console.log(userInfo.phone)
                //return

                if(type_status == 'crown'){
                    if(apply_status == 'own'){
                        console.log('自己申请皇冠经销商')
                        //ownCrownSeller(uid,real_name,phone);
                    }else if(apply_status == 'recommend'){
                        console.log('推荐申请皇冠经销商')
                        //recommendCrownSeller(uid,real_name,phone);
                    }
                }else if(type_status == 'star'){
                    console.log('推荐申请星级经销商')
                    //starSeller(real_name,phone,sellerType);
                }


            };

            function checkPhone(str){
                var isphone = /^((\+|0)86)?\d{11}$/.test(str);
                return isphone;
            }

            //皇冠经销申请--recommend
            function recommendCrownSeller(uid,real_name,phone){
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

            //皇冠经销申请--own
            function ownCrownSeller(uid,real_name,phone){
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

            //星级经销申请
            function starSeller(real_name,phone,sellerType){
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
                            console.log('获取进货明细：' + angular.toJson(json));
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
            var recommender_name = null;
            var type_status = null;
            var apply_status = null;

            initCode();

            function initCode(){
                recommender_id = $stateParams.recommenderId;
                recommender_name = $stateParams.recommenderName;
                type_status = $stateParams.typeStatus;
                apply_status = $stateParams.applyStatus;
                initQrcode();
            }

            function initQrcode(){
                var fallbackRUL = null;
                var localURL = window.location.href;

                var newLocalURL = localURL.substr(0, localURL.indexOf('#'));

                if(type_status == 'crown'){
                    fallbackRUL = '?fallback=applyauthentication-'+ recommender_id +'-'+ recommender_name +'-'+ apply_status +'-'+ type_status;
                }else if(type_status == 'star'){
                    fallbackRUL = '?fallback=applyauthentication-'+ recommender_id +'-'+ recommender_name +'-'+ apply_status +'-'+ type_status;
                }

                var divhtml = document.getElementById("dituContent");
                var invitationUrl = newLocalURL + fallbackRUL;
                loadScript("lib/qrcodejs/qrcode.min.js", function () {

                    var qrcode = new QRCode(divhtml, {
                        width: 800,
                        height: 800
                    });
                    qrcode.clear();
                    qrcode.makeCode(invitationUrl);
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