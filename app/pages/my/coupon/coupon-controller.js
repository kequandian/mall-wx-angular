angular.module('coupon.controller', ['coupon.service'])
    .controller('CouponController', ['$scope','$ocLazyLoad', 'CouponFty',
        function($scope,$ocLazyLoad, CouponFty){


            //title
            document.title = "优惠卷";

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    console.log('settlement:jquery loaded');
                })
            });

            var non_activation = 0;
            var non_activation_list = [];
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
                                    non_activation_list.push(v);
                                }else if(v.status == 'ACTIVATION'){
                                    activation++;
                                }else if(v.status == 'USED'){
                                    used++;
                                }else if(v.status == 'OVERDUE'){
                                    overdue++;
                                }
                            });
                            $scope.coupon_titles[0].count = non_activation;
                            $scope.coupon_titles[1].count = activation;
                            $scope.coupon_titles[2].count = used;
                            $scope.coupon_titles[3].count = overdue;
                            $scope.coupons = non_activation_list;
                        }else{
                            console.log('获取优惠卷失败：' + angular.toJson(json));
                        }
                    },function (error){
                        console.log('获取优惠卷失败：' + angular.toJson(error));
                    })
            }

            //title li
            $scope.coupon_titles = [{
                id:'1',
                name:'未领取',
                hidden_line: false,
                count:0
            },{
                id:'2',
                name:'可使用',
                hidden_line: true,
                count:0
            },{
                id:'3',
                name:'已使用',
                hidden_line: true,
                count:0
            },{
                id:'4',
                name:'已失效',
                hidden_line: true,
                count:0
            }];

            /*
             * nav 样式
             * */
            $scope.currentId = 1;

            $scope.clickme = function(id) {
                $scope.currentId = id;
            };

            //排序
            var orderByResult = '';
            $scope.couponsOrderBy = function(result){
                //console.log(result);
                if(result == 1){
                    orderByResult = "NON_ACTIVATION";//未激活
                }else if(result == 2){
                    orderByResult = "ACTIVATION";//已激活
                }else if(result == 3){
                    orderByResult = "USED";//已过期
                }else if(result == 4){
                    orderByResult = "OVERDUE";//已使用
                }
                var typeList = [];
                angular.forEach(allList, function(v, k){
                    if(v.status == orderByResult){
                        typeList.push(v);
                    }
                });
                $scope.coupons = typeList;
            };

            //判断价格添加边框
            $scope.check_money = function(money){
                if(money < 10){
                    return 'margin-right:10px';
                }else if(money > 10 && money < 100){
                    return 'margin-right:15px';
                }else if(money.length >= 100){
                    return '';
                }
            };

            //截取字符
            $scope.d_name = function(name){
                var dName = name.substr(0,name.indexOf('元')+1);
                return dName
            };
            $scope.type_name = function(name){
                var tName = name.substr(name.length - 3);
                return tName
            };
            $scope.cut_time = function(time){
                var cTime = time.split(' ');
                return cTime[0];
            };


    }]);