angular.module('my.order.controller', ['my.order.service'])
    .controller('OrderController', ['$scope', 'OrderFty', function($scope, OrderFty){

        //title
        document.title = "我的订单";

        $.showLoading("正在加载...");

        $scope.allIsNull = true;
        $scope.allShow = true;

        $scope.payIsNull = true;
        $scope.payShow = true;

        $scope.payedIsNull = true;
        $scope.payedShow = true;

        $scope.deliveredIsNull = true;
        $scope.deliveredShow = true;

        $scope.finishIsNull = true;
        $scope.finishShow = true;

        AllOrders();
        function AllOrders() {
            OrderFty.ordersService()
                .then(function (json) {
                    $scope.orders = json.data;
                    //alert($scope.orders);
                    $scope.payList = []; //待付款
                    $scope.payedList = [];//待发货
                    $scope.deliveredList = [];//待收货
                    $scope.finishList = [];//已完成
                    angular.forEach($scope.orders, function(v, k){
                        //待收货
                        if(v.status == "DELIVERING" || v.status == "DELIVERED_CONFIRM_PENDING"){
                            $scope.deliveredList.push(v);
                            return;
                        }
                        //待付款
                        if(v.status == "CREATED_PAY_PENDING"){
                            $scope.payList.push(v);
                            return;
                        }
                        //待发货
                        if(v.status == "CONFIRMED_DELIVER_PENDING" || v.status == "PAID_CONFIRM_PENDING"){
                            $scope.payedList.push(v);
                            return;
                        }
                        //已完成
                        if(v.status == "CLOSED_CONFIRMED" || v.status == "CLOSED_REFUNDED"){
                            $scope.finishList.push(v);
                        }
                    });

                },function (error){
                    console.log(error);
            })
                .finally(function(){

                    if($scope.orders.length > 0){
                        $scope.allIsNull = true;
                        $scope.allShow = false;
                    }else{
                        $scope.allIsNull = false;
                        $scope.allShow = true;
                    }

                    if($scope.payList.length > 0){
                        $scope.payIsNull = true;
                        $scope.payShow = false;
                    }else{
                        $scope.payIsNull = false;
                        $scope.payShow = true;
                    }

                    if($scope.payedList.length > 0){
                        $scope.payedIsNull = true;
                        $scope.payedShow = false;
                    }else{
                        $scope.payedIsNull = false;
                        $scope.payedShow = true;
                    }

                    if($scope.deliveredList.length > 0){
                        $scope.deliveredIsNull = true;
                        $scope.deliveredShow = false;
                    }else{
                        $scope.deliveredIsNull = false;
                        $scope.deliveredShow = true;
                    }

                    if($scope.finishList.length > 0){
                        $scope.finishIsNull = true;
                        $scope.finishShow = false;
                    }else{
                        $scope.finishIsNull = false;
                        $scope.finishShow = true;
                    }
                    $.hideLoading();
                })
        }

        //nav 样式
        $scope.currentId = 1;
        $scope.clickme = function(id) {
            $scope.currentId = id;
        };
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
