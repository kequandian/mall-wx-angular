angular.module('coupon.controller', ['coupon.service'])

    .controller('CouponController', ['$scope','$ocLazyLoad','$state','$rootScope', 'CouponFty',
        function($scope, $ocLazyLoad, $state, $rootScope, CouponFty){


            //title
            document.title = "优惠券";

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    console.log('settlement:jquery loaded');
                })
            });

            //隐藏红点
            $rootScope.red_point_status = true;

            var non_activation = 0;
            var activation_list = [];
            var activation = 0;
            var used = 0;
            var overdue = 0;
            var allList = null;
            getCoupons();
            function getCoupons() {

                CouponFty.couponsService()
                    .then(function (json) {
                        if(json.status_code == 0){
                            $scope.coupons = json.data;
                            allList = json.data;
                            //console.log(angular.toJson($scope.coupons));
                            angular.forEach(json.data, function(v, k){
                                if(v.status == 'NON_ACTIVATION'){
                                    non_activation++;
                                }else if(v.status == 'ACTIVATION'){
                                    activation++;
                                    activation_list.push(v);
                                }else if(v.status == 'USED'){
                                    used++;
                                }else if(v.status == 'OVERDUE'){
                                    overdue++;
                                }
                            });
                            $scope.coupon_titles[0].count = activation;
                            $scope.coupon_titles[1].count = non_activation;
                            $scope.coupon_titles[2].count = used;
                            $scope.coupon_titles[3].count = overdue;
                            $scope.coupons = activation_list;
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
                red_point:false
            },{
                id:'1',
                name:'未领取',
                hidden_line: true,
                count:0,
                red_point:false
            },{
                id:'3',
                name:'已使用',
                hidden_line: true,
                count:0,
                red_point:false
            },{
                id:'4',
                name:'已失效',
                hidden_line: true,
                count:0,
                red_point:false
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
            var orderByResult = '';
            $scope.non_status = false;
            $scope.a_status = true;
            $scope.couponsOrderBy = function(result){
                //console.log(result);
                if(result == 1){
                    orderByResult = "NON_ACTIVATION";//未激活
                    $scope.non_status = true;
                    $scope.a_status = false;
                    $scope.coupon_titles[1].red_point = false;
                    $rootScope.red_point_status = true;
                }else if(result == 2){
                    orderByResult = "ACTIVATION";//已激活
                    $scope.non_status = false;
                    $scope.a_status = true;
                }else if(result == 3){
                    orderByResult = "USED";//已过期
                    $scope.non_status = false;
                    $scope.a_status = true;
                }else if(result == 4){
                    orderByResult = "OVERDUE";//已使用
                    $scope.non_status = false;
                    $scope.a_status = true;
                }
                var typeList = [];
                angular.forEach(allList, function(v, k){
                    if(v.status == orderByResult){
                        typeList.push(v);
                    }
                });
                $scope.coupons = typeList;
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

    }]);