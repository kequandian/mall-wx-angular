angular.module('coupon.controller', ['coupon.service'])

    .directive('couponScrolly', function () {
        return {
            scope: {
                scroll: '=scrollPosition'
            },
            link: function (scope, element, attrs) {
                var raw = element[0];
                element.bind('scroll', function () {
                    //console.log(raw.scrollTop + raw.offsetHeight);
                    if (raw.scrollHeight - (raw.scrollTop + raw.offsetHeight) < 2) { //at the bottom
                        scope.$emit('$onScrollBottom');
                        //scope.$apply(attrs.scrolly);
                    }

                    if (raw.scrollTop < 400) { //at the bottom
                        if(!scope.emittedOnScrollTop) {
                            scope.$emit('$onScrollTop');
                            //console.log('$onScrollTop');

                            scope.emittedOnScrollTop = true;
                        }
                        scope.emittedOnScrollTopCancelled = false;
                    }else{
                        if(!scope.emittedOnScrollTopCancelled) {
                            scope.$emit('$onScrollTopCancelled');
                            //console.log('$onScrollTopCancelled');

                            scope.emittedOnScrollTopCancelled = true;
                        }
                        scope.emittedOnScrollTop = false;
                    }
                })
            }
        };
    })

    .controller('CouponController', ['$scope','$ocLazyLoad','$state','$rootScope','$timeout', 'CouponFty',
        function($scope, $ocLazyLoad, $state, $rootScope,$timeout, CouponFty){


            //title
            document.title = "优惠券";

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    console.log('settlement:jquery loaded');
                })
            });

            var pageNumber = 1;
            var pageSize = 10;
            var couponStatus = 'ACTIVATION';
            var loading = false;
            //隐藏红点
            $rootScope.red_point_status = true;

            getCoupons(couponStatus, pageNumber, pageSize);
            function getCoupons(couponStatus, pageNumber, pageSize) {

                CouponFty.couponsService(couponStatus, pageNumber, pageSize)
                    .then(function (json) {
                        if(json.status_code == 0){

                            $scope.coupon_titles[0].count = json.data.ACTIVATION > 0 ? json.data.ACTIVATION : 0;
                            $scope.coupon_titles[1].count = json.data.NON_ACTIVATION > 0 ? json.data.NON_ACTIVATION : 0;
                            $scope.coupon_titles[2].count = json.data.USED > 0 ? json.data.USED : 0;
                            $scope.coupon_titles[3].count = json.data.OVERDUE > 0 ? json.data.OVERDUE : 0;

                            if(json.data.coupons.length > 0){

                                if(pageNumber == 1){
                                    $scope.coupons = json.data.coupons;

                                    //console.log(angular.toJson($scope.coupons));

                                    if(json.data.coupons.length >= 10){
                                        loading = false;
                                        $scope.load_more_btn_show = true;
                                        $scope.height_ctrl = true;
                                    }else{
                                        loading = true;
                                        $scope.load_more_btn_show = false;
                                        $scope.height_ctrl = false;
                                    }
                                }else if(pageNumber > 1){
                                    angular.forEach(json.data.coupons, function(v, k){
                                        $scope.coupons.push(v);
                                    });
                                    if(json.data.coupons.length >= 10){
                                        loading = false;
                                        $scope.load_more_btn_show = true;
                                    }else{
                                        loading = true;
                                        $scope.load_more_btn_show = false;
                                    }
                                }
                            }else if(json.data.length == 0){
                                loading = true;
                                $scope.load_more_btn_show = false;
                            }

                        }else{
                            console.log('获取优惠券失败：' + angular.toJson(json));
                        }
                    },function (error){
                        console.log('获取优惠券失败：' + angular.toJson(error));
                    })
            }

            //title li
            $scope.coupon_titles = [{
                id:'2',
                name:'可使用',
                hidden_line: false,
                count:0,
                red_point:false,
                status:'ACTIVATION'
            },{
                id:'1',
                name:'未领取',
                hidden_line: true,
                count:0,
                red_point:false,
                status:'NON_ACTIVATION'
            },{
                id:'3',
                name:'已使用',
                hidden_line: true,
                count:0,
                red_point:false,
                status:'USED'
            },{
                id:'4',
                name:'已失效',
                hidden_line: true,
                count:0,
                red_point:false,
                status:'OVERDUE'
            }];

            //未激活优惠券红点
            //if($rootScope.isNewCoupon){
            //    $scope.coupon_titles[1].red_point = true;
            //}

            /*
             * nav 样式
             * */
            $scope.currentId = 2;

            $scope.clickme = function(id) {
                $scope.currentId = id;
            };

            //排序
            $scope.non_status = false;
            $scope.a_status = true;
            $scope.couponsOrderBy = function(result, status){

                document.getElementById('pro_content_top').scrollTop = 0;
                //console.log(result);
                if(result == 1){
                    $scope.non_status = true;
                    $scope.a_status = false;
                    $scope.coupon_titles[1].red_point = false;
                    $rootScope.red_point_status = true;
                }else if(result == 2){
                    $scope.non_status = false;
                    $scope.a_status = true;
                }else if(result == 3){
                    $scope.non_status = false;
                    $scope.a_status = true;
                }else if(result == 4){
                    $scope.non_status = false;
                    $scope.a_status = true;
                }
                couponStatus = status;
                $scope.coupons = null;
                pageNumber = 1;
                getCoupons(status, pageNumber, 10);

            };


            //激活优惠券
            $scope.activation_action = function(cItem){
                var couponId = cItem.id;
                console.log("couponId: " + couponId);
                CouponFty.activationService(couponId)
                    .then(function(json){
                        //console.log(angular.toJson(json));
                        if(json.status_code == 0 && json.message == 'activate.success'){

                            angular.forEach($scope.coupons,function(v, k){
                                if(v.id == couponId){
                                    $scope.coupon_titles[0].count = $scope.coupon_titles[0].count - 1;
                                    $scope.coupon_titles[1].count = $scope.coupon_titles[1].count + 1;
                                    v.status = 'ACTIVATION';
                                }
                            });
                            $.toast('激活成功');
                            $scope.couponsOrderBy(1);
                        }else if(json.status_code == 1 && json.message == 'user.must.be.followed'){
                                $.confirm('', '您还没关注公众号？', function () {
                                    if($rootScope.follow_url != null){
                                        window.location.href = $rootScope.follow_url;
                                    }else{
                                        $.toast('关注异常', 'cancel');
                                    }
                                }, function () {
                                    //取消操作
                                });
                            }else{
                                console.log('激活优惠券失败：' + angular.toJson(json));
                            }
                    }, function(error){
                        console.log('激活优惠券失败：' + angular.toJson(error));
                    })

            };

            //截取字符
            $scope.cut_time = function(time){
                var cTime = time.split(' ');
                return cTime[0];
            };


            //判断优惠券类型
            $scope.coupon_type_checked = function(money, discount, type){

                if(money > 0 && type == 'ORDER'){
                    $scope.isMoney = true;
                    $scope.isDiscount = false;
                    $scope.coupon_type = '代金券';
                }

                if(discount > 0 && type == 'ORDER'){
                    $scope.isMoney = false;
                    $scope.isDiscount = true;
                    $scope.coupon_type = '打折券';
                }

                if(type == 'PRODUCT'){
                    $scope.isMoney = true;
                    $scope.isDiscount = false;
                    $scope.coupon_type = '专用券';
                }
            };

            //加载更多
            $scope.$on('$onScrollBottom', function () {

                console.log('$onScrollBottom');
                if(loading){
                    console.log('loading : ' + loading);
                    return;
                }
                loading = true;
                setTimeout(function() {
                    pageNumber += 1;
                    getCoupons(couponStatus, pageNumber, pageSize);
                    loading = false;
                    console.log("loading: " + loading);
                }, 500);   //模拟延迟
            });

            $scope.$on('$onScrollTop', function () {
                //console.log('$onScrollTop');
            });
            $scope.$on('$onScrollTopCancelled', function () {
                //console.log('$onScrollTopCancelled');
            });


    }]);