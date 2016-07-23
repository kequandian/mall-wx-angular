/*
* 分销订单
* */
angular.module('promotionOrder.controller', ['promotionOrder.service', 'seller.session'])
    .controller('PromotionOrderController', ['$scope', '$filter', 'PromotionOrderFty', 'UserInfo', function($scope, $filter, PromotionOrderFty, UserInfo){

        //title
        document.title = "销售订单";

        /*$scope.pro_order_groups = [
            {
                name: "最近更新",
                items: [{
                    finish:'测试1'
                }],
                show: false
            },{
                name: "一周内",
                items: [{
                    finish:'测试3'
                }],
                show: false
            },{
                name: "一个月内",
                items: [{
                    finish:'测试5'
                }],
                show: false
            },{
                name: "更早",
                items: [{
                    finish:'测试7'
                }],
                show: false
            }
        ];*/

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        /*$scope.toggleGroup = function(group) {
            group.show = !group.show;
        };
        $scope.isGroupShown = function(group) {
            return group.show;
        };*/

        // 年月
        $scope.yearDefault = getDefaultYears();

        $scope.monDefault = getDefaultMons();

        $scope.thisYear = new Date().getYear() + 1900;
        $scope.thisMon = new Date().getMonth();


        //获取分销订单
        getPromotionOrders(null, null);
        
        function getPromotionOrders(start_date, end_date){
            PromotionOrderFty.promotionOrdersService(start_date, end_date)
                .then(function(json){
                    // alert(angular.toJson(json));
                    if(json.status_code == 0){
                        $scope.rewards = json.data;
                        //console.log(angular.toJson($scope.rewards));

                        var order_rewards = $scope.rewards.order_item_rewards;
                        $scope.rewards.orders = mergedOrderList(order_rewards);
                        
                    }else{
                        $.toast('获取分销订单失败', 'cancel');
                    }
                }, function(error){
                    $.toast('获取分销订单失败', 'cancel');
                })

        };

        function mergedOrderList(list){
            var order_hash = {};

            angular.forEach(list, function(item){

                if(!angular.isDefined(order_hash[item.order_number])){
                    //console.log(order_hash[item.order_number]);

                    var newItem = {"order_number": item.order_number};
                    newItem.state = item.state;
                    newItem.settled_time = item.order_paid_time;
                    newItem.settled_price = item.order_total_price;
                    newItem.agent_reward = 0;
                    newItem.partner_reward = 0;
                    newItem.seller_reward = 0;
                    newItem.platform_reward = 0;

                    if(item.type == 'SELLER') {
                        newItem.seller_reward = item.reward ;
                    }else if(item.type == 'AGENT'){
                        newItem.agent_reward = item.reward;
                    }else if(item.type == 'PARTNER'){
                        newItem.partner_reward = item.reward;
                    }else if(item.type == 'SELF'){
                        newItem.seller_reward = item.reward;
                    }else if(item.type == 'PLATFORM'){
                        newItem.platform_reward = item.reward;
                    }
                    newItem.total_reward = newItem.seller_reward + newItem.agent_reward + newItem.partner_reward;

                    order_hash[item.order_number] = newItem;

                }else{

                    var child = order_hash[item.order_number];

                    if(item.type == 'SELLER') {
                        child.seller_reward += item.reward ;
                    }else if(item.type == 'AGENT'){
                        child.agent_reward += item.reward;
                    }else if(item.type == 'PARTNER'){
                        child.partner_reward += item.reward;
                    }else if(item.type == 'SELF'){
                        child.seller_reward += item.reward;
                    }else if(item.type == 'PLATFORM'){
                        child.platform_reward += item.reward;
                    }

                    child.total_reward += item.reward;
                }

                //console.log(order_hash[item.order_number]);
            });

            /// from hash to list
            var orders = [];
            angular.forEach(order_hash, function(value, key) {
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
            var _end_date = new Date(year, mon+1, 1);
            var d_end_date = new Date(_end_date-1);

            // format date
            var start_date = $filter('date')(d_start_date,'yyyy-MM-dd');
            var end_date   = $filter('date')(d_end_date, 'yyyy-MM-dd');

            //console.log("start-date?"+start_date+",end-date?"+end_date);
            getPromotionOrders(start_date, end_date);
        }

        $scope.onSelectedYear = function(){
            /// set curMon

            //console.log("selectedYea?"+$scope.year+",selectedMon?"+$scope.mon);
            if($scope.year == $scope.thisYear) {
                var curMon = new Date().getMonth();
                if($scope.mon > curMon){
                    $scope.mon = curMon;
                }
            }

            $scope.monDefault = getDefaultMons();
        }

        function getDefaultYears(){
            //var years = [
            //    {key: 2015, value: "2015年"},
            //    {key: 2016, value: "2016年"}
            //];
            var years = [];

            var registered = !(UserInfo.register_date===undefined || UserInfo.register_date==null || UserInfo.register_date.length==0);

            var curYear = new Date().getYear() + 1900;
            var regDate = registered ? new Date(UserInfo.register_date) : new Date();
            var regYear = regDate.getYear() + 1900;
            var regMont = regDate.getMonth();

            //console.log("regiterYear?"+regYear+",registerMon?"+regMont);

            for(var y=regYear; y<= curYear; y++){
                years.push({key:y, value: y+'年'})
            }

            return years;
        }

        function getDefaultMons(){
            var mons = [];

            var now = new Date();
            var curYear = now.getYear() + 1900;
            var curMon = now.getMonth();
            var selectedYear = $scope.year ? $scope.year : curYear;

            //console.log("yea?"+curYear+",selectedYea?"+selectedYear);
            if(curYear!=selectedYear){
                return defaultMons;
            }

            var registered = !(UserInfo.register_date===undefined || UserInfo.register_date==null || UserInfo.register_date.length==0);
            var regDate = registered ? new Date(UserInfo.register_date) : new Date();
            var regMonth = regDate.getMonth();

            for(var m=regMonth; m<=curMon; m++){
                var mm = m+1;
                if(mm < 10 ){
                    mm = '0' + mm;
                }
                mons.push({key: m, value:mm+"月"})
            }

            return mons;
        }

        var defaultMons = [
            {key: 0,  value: "01月"},
            {key: 1,  value: "02月"},
            {key: 2,  value: "03月"},
            {key: 3,  value: "04月"},
            {key: 4,  value: "05月"},
            {key: 5,  value: "06月"},
            {key: 6,  value: "07月"},
            {key: 7,  value: "08月"},
            {key: 8,  value: "09月"},
            {key: 9, value: "10月"},
            {key: 10, value: "11月"},
            {key: 11, value: "12月"}
        ];
    }]);