
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
                            console.log(angular.toJson(json.data));
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
     * 经销团队
     * */
    .controller('SellerAuthorizationController', ['$scope','$state','$stateParams', 'SellerTeamFty',
        function ($scope,$state,$stateParams, SellerTeamFty) {

            //title
            document.title = "经销授权";

            var isAgent = $stateParams.isAgent;
            var sellerType;

            if(isAgent != null){
                if(isAgent){
                    $scope.is_agent = isAgent;
                    $scope.action_text = '经销商授权';
                }else{
                    $scope.is_agent = isAgent;
                    $scope.action_text = '提交申请';
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
                            if(!json.data.phone != null){
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
                            if(json.status_code == 1 && json.message == "user.is.not.crownship"){
                                $.toast('授权失败,该用户不是皇冠级别', 'cancel');
                            }else{
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


        }])

    /*
     * 我的推荐
     * */
    .controller('MyRecommendController', ['$scope', 'SellerTeamFty','UserInfo',
        function ($scope, SellerTeamFty, UserInfo) {

            //title
            document.title = "我的推荐";

            // 年月
            $scope.yearDefault = getDefaultYears();

            $scope.monDefault = getDefaultMons();

            $scope.thisYear = new Date().getYear() + 1900;
            $scope.thisMon = new Date().getMonth();
            $scope.year = $scope.thisYear;
            $scope.mon = $scope.thisMon;

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

                if (curYear != selectedYear) {
                    return defaultMons;
                }

                var registered = !(UserInfo.register_date === undefined || UserInfo.register_date == null || UserInfo.register_date.length == 0);
                var regDate = registered ? fixIOSDate(UserInfo.register_date) : new Date();
                var regMonth = regDate.getMonth();

                for (var m = regMonth; m <= curMon; m++) {
                    var mm = m + 1;
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    mons.push({key: m, value: mm + "月"})
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

            // 查询销售订单数据
            $scope.postOrder = function () {
                var year = $scope.year;
                var mon = $scope.mon;

                //if (mon < 10) {
                //    mon = '0' + mon;
                //}
                //var start_date = year + "-" + mon + "-" + "01";
                //var end_date = year + "-" + mon + "-" + "30";

                var d_start_date = new Date(year, mon, 1);
                var _end_date = new Date(year, mon + 1, 1);
                var d_end_date = new Date(_end_date - 1);

                // format date
                var start_date = $filter('date')(d_start_date, 'yyyy-MM-dd');
                var end_date = $filter('date')(d_end_date, 'yyyy-MM-dd');

                //console.log("start-date?"+start_date+",end-date?"+end_date);
                getPromotionOrders(start_date, end_date);
            }

            $scope.onSelectedYear = function () {
                /// set curMon
                $scope.monDefault = getDefaultMons();

                //console.log("selectedYea?"+$scope.year+",selectedMon?"+$scope.mon);
                if ($scope.year == $scope.thisYear) {
                    var curMon = new Date().getMonth();
                    if ($scope.mon > curMon) {
                        $scope.mon = curMon;
                    }
                }else{
                    var firstMon = $scope.monDefault[0];
                    if($scope.mon < firstMon){
                        $scope.mon = firstMon;
                    }
                }
            }

        }])


;