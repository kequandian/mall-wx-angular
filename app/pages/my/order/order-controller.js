angular.module('my.order.controller', ['my.order.service'])
    .controller('OrderController', ['$scope','$state','$rootScope', 'OrderFty','CommonJs',
        function($scope,$state,$rootScope, OrderFty,CommonJs){

            //title
            document.title = "我的订单";

            //nav 样式
            var scope = $rootScope;
            scope.$watch('orderTabsIndex',function(nValue, oValue){
                $scope.currentId = nValue;
            });

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
    }])

    /* 全部订单 */
    .controller('allController', ['$scope','$state','$rootScope','$timeout','OrderFty','CommonJs',
        function($scope,$state,$rootScope,$timeout,OrderFty,CommonJs){

            $rootScope.orderTabsIndex = 1;

            $.showLoading("正在加载...");

            $scope.allIsNull = true;
            $scope.allShow = true;

            AllOrders();
            function AllOrders() {
                OrderFty.ordersService()
                    .then(function (json) {
                        if(json.status_code == 0) {
                            $scope.orders = json.data;
                            //alert(angular.toJson($scope.orders));
                            $scope.order_list = [];
                            angular.forEach($scope.orders, function (v, k) {
                                if (v.status != "CANCELED_RETURN_PENDING" && v.status != "CANCELED_REFUND_PENDING" && v.status != "CLOSED_REFUNDED") {
                                    $scope.order_list.push(v);
                                }
                            });
                        }else{
                            $.toast('读取订单信息失败');
                        }
                    },function (error){
                        console.log(error);
                        $.toast('读取订单信息失败');
                    })
                    .finally(function(){
                        if($scope.orders.length > 0){
                            $scope.allIsNull = true;
                            $scope.allShow = false;
                        }else{
                            $scope.allIsNull = false;
                            $scope.allShow = true;
                        }
                        $timeout(function(){
                            $.hideLoading();
                        },1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function(orderStatus){
                return CommonJs.OrderStatus(orderStatus);
            };
        }])

    /* 待付款 */
    .controller('payController', ['$scope','$state','$rootScope','$timeout','OrderFty','CommonJs',
        function($scope,$state,$rootScope,$timeout,OrderFty,CommonJs){

            $rootScope.orderTabsIndex = 2;
            $.showLoading("正在加载...");

            $scope.payIsNull = true;
            $scope.payShow = true;

            payOrders();
            function payOrders() {
                OrderFty.ordersService()
                    .then(function (json) {
                        if(json.status_code == 0) {
                            var orders = json.data;
                            //alert(angular.toJson($scope.orders));
                            $scope.payList = []; //待付款
                            angular.forEach(orders, function(v, k){
                                if(v.status == "CREATED_PAY_PENDING"){
                                    $scope.payList.push(v);
                                }
                            });
                        }else{
                            $.toast('读取订单信息失败');
                        }
                    },function (error){
                        console.log(error);
                    })
                    .finally(function(){
                        if($scope.payList.length > 0){
                            $scope.payIsNull = true;
                            $scope.payShow = false;
                        }else{
                            $scope.payIsNull = false;
                            $scope.payShow = true;
                        }
                        $timeout(function(){
                            $.hideLoading();
                        },1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function(orderStatus){
                return CommonJs.OrderStatus(orderStatus);
            };

            //立即付款
            $scope.weixin_pay = function(order_number){
                window.location.href='/app/payment/wpay/'+ order_number;
            }

        }])

    /* 待发货 */
    .controller('payedController', ['$scope','$state','$rootScope','$timeout','OrderFty','CommonJs',
        function($scope,$state,$rootScope,$timeout,OrderFty,CommonJs){

            $rootScope.orderTabsIndex = 3;

            $.showLoading("正在加载...");

            $scope.payedIsNull = true;
            $scope.payedShow = true;

            payedOrders();
            function payedOrders() {
                OrderFty.ordersService()
                    .then(function (json) {
                        if(json.status_code == 0) {
                            var orders = json.data;
                            //alert(angular.toJson($scope.orders));
                            $scope.payedList = [];//待发货
                            angular.forEach(orders, function(v, k){
                                if(v.status == "CONFIRMED_DELIVER_PENDING" || v.status == "PAID_CONFIRM_PENDING"){
                                    $scope.payedList.push(v);
                                }
                            });
                        }else{
                            $.toast('读取订单信息失败');
                        }
                    },function (error){
                        console.log(error);
                    })
                    .finally(function(){
                        if($scope.payedList.length > 0){
                            $scope.payedIsNull = true;
                            $scope.payedShow = false;
                        }else{
                            $scope.payedIsNull = false;
                            $scope.payedShow = true;
                        }
                        $timeout(function(){
                            $.hideLoading();
                        },1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function(orderStatus){
                return CommonJs.OrderStatus(orderStatus);
            };

        }])

    /* 待收货 */
    .controller('deliveredController', ['$scope','$state','$rootScope','$timeout','OrderFty','CommonJs',
        function($scope,$state,$rootScope,$timeout,OrderFty,CommonJs){

            $rootScope.orderTabsIndex = 4;
            $.showLoading("正在加载...");

            $scope.deliveredIsNull = true;
            $scope.deliveredShow = true;

            deliveredOrders();
            function deliveredOrders() {
                OrderFty.ordersService()
                    .then(function (json) {
                        if(json.status_code == 0) {
                            var orders = json.data;
                            //alert(angular.toJson($scope.orders));
                            $scope.deliveredList = [];//待收货
                            angular.forEach(orders, function(v, k){
                                if(v.status == "DELIVERING" || v.status == "DELIVERED_CONFIRM_PENDING"){
                                    $scope.deliveredList.push(v);
                                }
                            });
                        }else{
                            $.toast('读取订单信息失败');
                        }
                    },function (error){
                        console.log(error);
                    })
                    .finally(function(){
                        if($scope.deliveredList.length > 0){
                            $scope.deliveredIsNull = true;
                            $scope.deliveredShow = false;
                        }else{
                            $scope.deliveredIsNull = false;
                            $scope.deliveredShow = true;
                        }
                        $timeout(function(){
                            $.hideLoading();
                        },1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function(orderStatus){
                return CommonJs.OrderStatus(orderStatus);
            };

        }])

    /* 已完成 */
    .controller('finishController', ['$scope','$state','$rootScope','$timeout','OrderFty','CommonJs',
        function($scope,$state,$rootScope,$timeout,OrderFty,CommonJs){

            $rootScope.orderTabsIndex = 5;
            $.showLoading("正在加载...");

            $scope.finishIsNull = true;
            $scope.finishShow = true;

            finishOrders();
            function finishOrders() {
                OrderFty.ordersService()
                    .then(function (json) {
                        if(json.status_code == 0) {
                            var orders = json.data;
                            //alert(angular.toJson($scope.orders));
                            $scope.finishList = [];//已完成
                            angular.forEach(orders, function(v, k){
                                //已完成
                                if(v.status == "CLOSED_CONFIRMED" || v.status == "CLOSED_REFUNDED"){
                                    $scope.finishList.push(v);
                                }
                            });
                        }else{
                            $.toast('读取订单信息失败');
                        }
                    },function (error){
                        console.log(error);
                    })
                    .finally(function(){
                        if($scope.finishList.length > 0){
                            $scope.finishIsNull = true;
                            $scope.finishShow = false;
                        }else{
                            $scope.finishIsNull = false;
                            $scope.finishShow = true;
                        }
                        $timeout(function(){
                            $.hideLoading();
                        },1000);
                    })
            }

            //订单状态
            $scope.order_list_status = function(orderStatus){
                return CommonJs.OrderStatus(orderStatus);
            };

        }])

;



