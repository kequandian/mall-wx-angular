angular.module('my.controller', ['my.service'])

    .controller('MyController', ['$scope','$state','$rootScope','MyFty','$ocLazyLoad','cateLeftIndex',
        function($scope,$state,$rootScope, MyFty, $ocLazyLoad,cateLeftIndex){

            //title
            document.title = "个人中心";

            $rootScope.tabsNumber = 5;
            cateLeftIndex.cate_nav_index = 0;
            cateLeftIndex.goods_list_index = 0;

            //用户信息
            getUserInfo();
            //获取订单信息
            myOrderList();

            //fallbackRedirect('/home/my');

            //修改url地址，用于分享
            function fallbackRedirect(routeValue) {
                if (!(window.location.href.indexOf('fb_redirect=true')> 0)) {
                    var currentState = history.state;

                    var routes = routeValue.split('/');
                    var fallValue = routes.join('-');

                    var newurl = "";
                    if (window.location.href.indexOf('?') > 0) {
                        var params = window.location.href.split('?');
                        var newParams = params[1].split('#')[0];
                        newurl = '?' + newParams + '&fallback="' + fallValue + '#' + routeValue;

                    } else {
                        newurl = '?fallback='+fallValue+'#'+ routeValue;

                    }
                    //console.log('newurl: ' + newurl);

                    //prevents browser from storing history with each change:
                    window.history.pushState(currentState, document.title, newurl);
                }
            }

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
                                //console.log('userInfo?'+angular.toJson(json.data))

                                $rootScope.profile_session.userInfo = $scope.userInfo;
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