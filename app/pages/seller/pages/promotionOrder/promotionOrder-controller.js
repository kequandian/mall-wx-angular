/*
* 分销订单
* */
angular.module('promotionOrder.controller', ['promotionOrder.service'])
    .controller('PromotionOrderController', ['$scope', 'PromotionOrderFty', function($scope, PromotionOrderFty){

        //title
        document.title = "销售订单";

        $scope.pro_order_groups = [
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
        ];

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
            group.show = !group.show;
        };
        $scope.isGroupShown = function(group) {
            return group.show;
        };

        //获取分销订单
        getPromotionOrders();
        function getPromotionOrders(){
            PromotionOrderFty.promotionOrdersService()
                .then(function(json){
                    if(json.status_code == 0){
                        $scope.promotion_order_list = json.data;
                        //alert(angular.toJson($scope.promotion_order_list));
                    }
                }, function(error){
                    $.toast('获取分销订单失败', 'cancel');
                })
        }


    }]);