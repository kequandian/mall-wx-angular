angular.module('my.controller', ['my.service'])

    .controller('MyController', ['$scope','$state','$rootScope','MyFty','$ocLazyLoad','cateLeftIndex','cateCacheCode','wCateCache',
        function($scope,$state,$rootScope, MyFty, $ocLazyLoad,cateLeftIndex,cateCacheCode,wCateCache){

            //title
            document.title = "个人中心";

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    //console.log("myPage:jquery loaded");
                })
            });

            if($rootScope.red_point_status){
                $rootScope.redPoint = false;
                $rootScope.isNewCoupon = false;
            }

            $rootScope.tabsNumber = 5;
            cateLeftIndex.cate_nav_index = 0;
            cateLeftIndex.goods_list_index = 0;
            $scope.is_new_coupon = false;

            var scope = $rootScope;
            scope.$watch('isNewCoupon', function (nValue, oValue) {
                $scope.is_new_coupon = nValue;
            });

            //用户信息
            getUserInfo();
            //获取订单信息
            myOrderList();

            //fallbackRedirect("/home/my");

            //for share
            function fallbackRedirect(routeValue) {
                if(routeValue==null || routeValue.length==0){
                    // cut fallback
                    if (window.location.href.indexOf('?') >= 0) {
                        // has param here
                        var params = window.location.href.split('?');
                        var paramLong = params[1];  // append #
                        var param = paramLong.replace(/\&*fallback=[\w\-]+/, "");
                        console.log("paramLong?"+paramLong);
                        console.log("param    ?"+param);

                        if(param.indexOf('#')!=0){
                            param = '?' + param;
                        }

                        if(paramLong != param){
                            window.history.pushState(history.state, document.title, param);
                        }

                    }// else do nothing

                }else if (window.location.href.indexOf('fb_redirect=true') == -1) {

                    var currentState = history.state;

                    // convert from /home/my to home-my
                    var routes = routeValue.split('/');
                    var fallValue = routeValue.length >0 ? routes.join('-') : "";
                    if(fallValue.indexOf('-')==0){
                        fallValue = fallValue.substr(1,fallValue.length);
                        console.log("fallValue?"+fallValue);
                    }

                    var newurl = "";
                    if (window.location.href.indexOf('?') >= 0) {
                        var params = window.location.href.split('?');
                        var paramLong = params[1];  // append #
                        console.log("paramLong?"+paramLong);

                        if(paramLong.indexOf('fallback=')>=0) {

                            if(routeValue.length>0) {
                                //REGEX, replace previous fallback
                                var param = paramLong.replace(/\&*fallback=[\w\-]+/, "&fallback=" + fallValue);
                                if(param.indexOf('&')==0){
                                    param = param.substr(1, param.length);
                                }
                                newurl = param;
                                //console.log("param?   ", param);
                            }else{

                                // remove callback
                                var param = paramLong.replace(/\\?fallback=[\w\-]+/, "");
                                newurl = param;
                                //console.log('param: ' + param);
                            }

                        }else {
                            var param = paramLong.split('#')[0];
                            newurl = param + '&fallback=' + fallValue + '#' + routeValue;
                            //console.log('newurl2: ' + newurl);
                        }

                        //prevents browser from storing history with each change:
                        if( paramLong != newurl ) {
                            window.history.pushState(currentState, document.title, '?'+newurl);
                        }

                    } else {  /// rare
                        // no params, just add fallback data
                        newurl = '?fallback=' + fallValue + '#' + routeValue;
                        window.history.pushState(currentState, document.title, newurl);
                        console.log('newurl [no parms]: ' + newurl);
                    }

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

            //进入地址设置
            $scope.goToAddressManager = function(){
                wCateCache.isCrown = false;
                $state.go('addressManager');
            };

            //default category params
            //cateCacheCode.index_first=0;
            //cateCacheCode.index_second=0;
            //cateCacheCode.cate_session=null;
            //cateCacheCode.second_cate=null;
            //cateCacheCode.product_list=null;
            //cateCacheCode.product_id=-1;
            //cateCacheCode.loading=false;
            //cateCacheCode.load_more_btn_show= true;

    }]);