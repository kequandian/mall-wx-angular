/*
* 分销订单
* */
angular.module('promotionOrder.controller', ['promotionOrder.service', 'global'])
    .controller('PromotionOrderController', ['$scope', 'PromotionOrderFty', function($scope, PromotionOrderFty){

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


        //获取分销订单
        getPromotionOrders();

        function getPromotionOrders(){
            PromotionOrderFty.promotionOrdersService()
                .then(function(json){
                    //alert(angular.toJson(json));
                    if(json.status_code == 0){
                        $scope.rewards = json.data;
                        //alert(angular.toJson($scope.rewards));

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
                    newItem.settled_time = item.settled_time;
                    newItem.settled_price = undefined;

                    if(item.type == 'SELLER') {
                        newItem.seller_reward = item.reward ;
                    }else if(item.type == 'AGENT'){
                        newItem.agent_reward = item.reward;
                    }else if(item.type == 'PARTNER'){
                        newItem.partner_reward = item.reward;
                    }else if(item.type == 'SELF'){
                        newItem.self_reward = item.reward;
                    }else if(item.type == 'PLATFORM'){
                        newItem.platform_reward = item.reward;
                    }

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
                        child.self_reward += item.reward;
                    }else if(item.type == 'PLATFORM'){
                        child.platform_reward += item.reward;
                    }
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

    }]);