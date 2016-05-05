angular.module('my.order.controller', ['my.order.service'])
    .controller('OrderController', ['$scope', 'OrderFty', function($scope, OrderFty){

        //nav 样式
        $scope.currentId = 1;
        $scope.clickme = function(id) {
            $scope.currentId = id;
        };

        AllOrders();
        function AllOrders() {
            OrderFty.ordersService()
                .then(function (json) {
                    $scope.orders = json.data;
                },function (error){
                    console.log(error);
            })
        }


        //title li
        $scope.order_titles = [{
            'id':'1',
            'name':'全部',
            'srefName':'.all'
        },{
            'id':'2',
            'name':'待付款',
            'srefName':'.pay'
        },{
            'id':'3',
            'name':'待发货',
            'srefName':'.payed'
        },{
            'id':'4',
            'name':'待收货',
            'srefName':'.delivered'
        },{
            'id':'5',
            'name':'已完成',
            'srefName':'.finish'
        }];



    }]);
