/*
 * 分销订单
 * */
angular.module('promotionOrder.controller', ['promotionOrder.service', 'seller.session'])
    .controller('PromotionOrderController', ['$scope', '$filter', 'PromotionOrderFty', 'UserInfo', 'PointRate',
        function ($scope, $filter, PromotionOrderFty, UserInfo, PointRate) {

            //title
            document.title = "积分订单";

            $scope.point_rate = PointRate.rate;

            // 年月
            $scope.yearDefault = getDefaultYears();

            $scope.monDefault = getDefaultMons();

            $scope.thisYear = new Date().getYear() + 1900;
            $scope.thisMon = new Date().getMonth();
            $scope.year = $scope.thisYear;
            $scope.mon = $scope.thisMon;
            //console.log("curYear:"+$scope.year);
            //console.log("curMon:"+$scope.mon);


            //获取分销订单
            getPromotionOrders(null, null);

            function getPromotionOrders(start_date, end_date) {
                PromotionOrderFty.promotionOrdersService(start_date, end_date)
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.rewards = json.data;
                            //console.log(angular.toJson(json.data));

                            var order_rewards = $scope.rewards.order_item_rewards;
                            $scope.rewards.orders = mergedOrderList(order_rewards);

                        } else {
                            $.toast('获取分销订单失败', 'cancel');
                        }
                    }, function (error) {
                        $.toast('获取分销订单失败', 'cancel');
                        console.log(angular.toJson(error));
                    })

            };

            function mergedOrderList(list) {
                var order_hash = {};

                angular.forEach(list, function (item) {

                    if (!angular.isDefined(order_hash[item.order_number])) {
                        //console.log(order_hash[item.order_number]);

                        var newItem = {"order_number": item.order_number, "order_user_name": item.order_user_name};
                        newItem.state = item.state;
                        newItem.settled_time = item.order_paid_time;
                        newItem.settled_price = item.order_total_price;
                        newItem.agent_reward = 0;
                        newItem.partner_reward = 0;
                        newItem.seller_reward = 0;
                        newItem.platform_reward = 0;
                        newItem.crown_reward = 0;
                        newItem.merchant_reward = 0;
                        newItem.payment_type = item.payment_type;
                        newItem.point_exchange_rate = item.point_exchange_rate;

                        if (item.type == 'SELLER') {
                            newItem.seller_reward = item.reward;
                        } else if (item.type == 'AGENT') {
                            newItem.agent_reward = item.reward;
                        } else if (item.type == 'PARTNER') {
                            newItem.partner_reward = item.reward;
                        } else if (item.type == 'SELF') {
                            newItem.seller_reward = item.reward;
                        } else if (item.type == 'PLATFORM') {
                            newItem.platform_reward = item.reward;
                        } else if (item.type == 'CROWN') {
                            newItem.crown_reward = item.reward;
                        } else if (item.type == 'MERCHANT') {
                          newItem.merchant_reward = item.reward;
                        }
                        newItem.total_reward = newItem.seller_reward + newItem.agent_reward + newItem.partner_reward + newItem.crown_reward + newItem.merchant_reward;

                        order_hash[item.order_number] = newItem;

                    } else {

                        var child = order_hash[item.order_number];

                        if (item.type == 'SELLER') {
                            child.seller_reward += item.reward;
                        } else if (item.type == 'AGENT') {
                            child.agent_reward += item.reward;
                        } else if (item.type == 'PARTNER') {
                            child.partner_reward += item.reward;
                        } else if (item.type == 'SELF') {
                            child.seller_reward += item.reward;
                        } else if (item.type == 'PLATFORM') {
                            child.platform_reward += item.reward;
                        } else if (item.type == 'CROWN') {
                            child.crown_reward += item.reward;
                        } else if (item.type == 'MERCHANT') {
                          child.merchant_reward = item.reward;
                        }

                        child.total_reward += item.reward;
                    }

                    //console.log(order_hash[item.order_number]);
                });

                /// from hash to list
                var orders = [];
                angular.forEach(order_hash, function (value, key) {
                    orders.push(value);
                });

                return orders;
            }

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

                getPromotionOrders(start_date, end_date);
            };

            $scope.onSelectedYear = function () {
                /// set curMon
                $scope.monDefault = getDefaultMons();
                var year = $scope.year;

                //console.log("selectedYea?"+$scope.year+",selectedMon?"+$scope.mon);
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

                var d_start_date = new Date(year, mon, 1);
                var _end_date = new Date(year, mon + 1, 1);
                var d_end_date = new Date(_end_date - 1);

                // format date
                var start_date = $filter('date')(d_start_date, 'yyyy-MM-dd');
                var end_date = $filter('date')(d_end_date, 'yyyy-MM-dd');

                getPromotionOrders(start_date, end_date);
            };

            /// fix IOS date format issue
            function fixIOSDate(date_string){

                var reg_date = new Date(date_string);

                if(isNaN(reg_date)){
                    var date_s = date_string.replace(/\-/g, '/');
                    date_s = date_s.substr(0, 10);
                    reg_date = new Date(date_s);
                }
                console.log("reg_date: " + reg_date);

                return reg_date;
            }

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
        }]);
