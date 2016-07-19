angular.module('my.controller', ['my.service'])

    .controller('MyController', ['$scope','$state','$rootScope','MyFty','$ocLazyLoad',
        function($scope,$state,$rootScope, MyFty, $ocLazyLoad){

            //title
            document.title = "个人中心";

            $rootScope.tabsNumber = 5;

            //用户信息
            getUserInfo();
            //获取订单信息
            myOrderList();

            function getUserInfo(){
                var loaded = false;
                if ($rootScope.profile_session) {
                    if ($rootScope.profile_session.userInfo) {
                        loaded = true;
                        //console.log('userInfo loaded')
                    }
                } else {
                    $rootScope.profile_session = {}
                }

                if(!loaded) {
                    MyFty.userInfoService()
                        .then(function (json) {
                            if (json.status_code == 0) {
                                $scope.userInfo = json.data;
                            }
                        }, function (error) {
                            $.toast('获取信息失败', 'cancel');
                        })
                }else{
                    $scope.userInfo = $rootScope.profile_session.userInfo;
                }
            }

            //获取订单信息
            function myOrderList(){
                MyFty.myOrderListService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.my_orders = json.data;
                            var payCount = 0;
                            var payedCount = 0;
                            var deliveredCount = 0;
                            angular.forEach($scope.my_orders, function(v, k){
                                if (v.status == "CREATED_PAY_PENDING") {
                                    payCount++;
                                }
                                if (v.status == "CONFIRMED_DELIVER_PENDING" || v.status == "PAID_CONFIRM_PENDING") {
                                    payedCount++;
                                }
                                if (v.status == "DELIVERING" || v.status == "DELIVERED_CONFIRM_PENDING") {
                                    deliveredCount++;
                                }
                            });
                            $scope.payCount = payCount;
                            $scope.payedCount = payedCount;
                            $scope.deliveredCount = deliveredCount;
                        }
                    }, function(error){
                        console.log('获取订单失败：' + error);
                    })
            }


    }]);