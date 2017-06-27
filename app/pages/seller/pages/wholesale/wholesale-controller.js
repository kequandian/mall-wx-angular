angular.module('wholesale.controller', ['wholesale.service'])

        .controller('WholesaleController', ['$scope','$state','$stateParams','$ocLazyLoad', 'WholesaleFty','WholesalePCDCode','wCateCache',
        function($scope,$state,$stateParams,$ocLazyLoad, WholesaleFty,WholesalePCDCode,wCateCache){

            document.title = '商品批发';
            var isCrown = null;
            $scope.default_pcd = null;
            var pcd = null;


            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    //console.log("homePage:jquery loaded");
                })
            });


            initCode();
            function initCode(){

                if(wCateCache.isPcs == 0){
                    console.log(1)
                    $state.go('home.sellerPage');
                }else if(wCateCache.isPcs == -1){
                    console.log(2)
                    //isCrown = $stateParams.isCrown;
                    /*if(isCrown != null && isCrown == 'true'){
                        console.log(3)
                        $scope.is_crown = true;
                        //地址列表
                        getDefaultAddress();
                    }else if(isCrown != null && isCrown == 'false'){
                        console.log(4)
                        $scope.is_crown = false;
                    }*/

                    //地址列表
                    getDefaultAddress();
                }
            }


            //获取商品批发信息
            function getDefaultAddress(){
                WholesaleFty.getContactsService()
                    .then(function(json){
                        if(json.status_code == 0){

                            //console.log("地址列表：" + angular.toJson(json));
                            var default_pcd = null;
                            angular.forEach(json.data, function (data, index) {
                                if (data.is_default == 1) {
                                    default_pcd = data;
                                }
                            });

                            if(default_pcd != null){
                                $scope.region_is_null = false;
                                $scope.default_pcd = default_pcd;
                            }else{
                                $scope.region_is_null = true;
                            }
                        }else{
                            console.log("获取商品批发信息失败：" + angular.toJson(json));
                        }
                    }, function(error) {
                        console.log("获取商品批发信息失败：" + angular.toJson(error));
                    }).finally(function(){
                        console.log("finally");
                    })

            }

            //进入商品批发列表
            $scope.goToWholesaleGoodsList = function(regionIsNull){
                if(!regionIsNull){
                    var pcd = $scope.default_pcd;

                    WholesalePCDCode.province = pcd.province;
                    WholesalePCDCode.city = pcd.city;
                    WholesalePCDCode.district = pcd.district;

                    //console.log('pcdBody：' + angular.toJson(pcd_body));
                    //return;
                    $state.go('wholesaleGoodsList');
                }
            };

            //申请皇冠按钮
            $scope.crownApplyAction = function(){
                $state.go('applyauth',
                    {
                        recommenderId: -1,
                        typeStatus: 'crown',
                        applyStatus: 'own'
                    });
            };

            //取消按钮
            $scope.crownApplyCancelAction = function(){
                $state.go('home.sellerPage');
            };

            //编辑地址
            $scope.editAddressAction = function(item){
                $state.go('edit-address', {data: item});
            };

            //删除地址
            $scope.deleteContactAction = function(id){
                $.confirm("", "确认删除?", function () {
                    WholesaleFty.deleteContactService(id).then(
                        function (result) {
                            if(result.status_code == 0){
                                //console.log(result);
                                $scope.region_is_null = true;
                            }else{
                                $scope.region_is_null = false;
                                console.log('删除配送地址失败' + angular.toJson(result));
                            }
                        }, function (error) {
                            $scope.region_is_null = false;
                            console.log('删除配送地址失败' + angular.toJson(error));
                        });
                    $.toast("已经删除!");
                }, function () {
                    //取消操作
                    $scope.region_is_null = false;
                });
            };

            //进入地址设置
            $scope.goToAddressAction = function(){
                $state.go('addressManager');
            };

            //进入添加地址
            $scope.add_address_action = function(){
                $state.go('addWholesaleAddress');
            };


            //判断是否为苹果
            var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE')!= -1;

            // 元素失去焦点隐藏iphone的软键盘
            function objBlur(id,time){
                if(typeof id != 'string') throw new Error('objBlur()参数错误');
                var obj = document.getElementById(id),
                    time = time || 500,
                    docTouchend = function(event){
                        if(event.target!= obj){
                            setTimeout(function(){
                                obj.blur();
                                document.removeEventListener('touchend', docTouchend,false);
                            },time);
                        }
                    };
                if(obj){
                    obj.addEventListener('focus', function(){
                        document.addEventListener('touchend', docTouchend,false);
                    },false);
                }else{
                    throw new Error('objBlur()没有找到元素');
                }
            }



        }]);