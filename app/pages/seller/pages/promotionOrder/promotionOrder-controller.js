angular.module('promotionOrder.controller', ['promotionOrder.service'])

    .controller('PromotionOrderController', ['$scope', 'PromotionOrderFty', function($scope, PromotionOrderFty){

        //title li
        $scope.pro_order_titles = [{
            'id':'1',
            'name':'全部'
        },{
            'id':'2',
            'name':'已结算'
        },{
            'id':'3',
            'name':'未结算'
        }];

        //nav 样式
        $scope.currentId = 1;
        $scope.clickme = function(id) {
            $scope.currentId = id;
        };


    }]);