angular.module('wholesale.controller', ['wholesale.service'])

        .controller('WholesaleController', ['$scope','$state','$stateParams', 'WholesaleFty',
        function($scope,$state,$stateParams, WholesaleFty){

            document.title = '商品批发';
            var isCrown = null;
            var wholesaleInfo = null;
            initCode();
            function initCode(){
                isCrown = $stateParams.isCrown;
                if(isCrown != null && isCrown){
                    $scope.is_crown = true;
                    getWholesaleInfo();
                }else{
                    $scope.is_crown = false;
                }
            }

            //获取商品批发信息
            function getWholesaleInfo(){
                WholesaleFty.getWholesaleInfoService()
                    .then(function(json){
                        if(json.status_code == 0){
                            wholesaleInfo = json.data;
                            //console.log("商品批发信息：" + angular.toJson(json));
                        }else{
                            console.log("获取商品批发信息失败：" + angular.toJson(json));
                        }
                    }, function(error) {
                        console.log("获取商品批发信息失败：" + angular.toJson(error));
                    }).finally(function(){
                        console.log("finally");
                        if(wholesaleInfo != null){
                            if(wholesaleInfo.wholesaleRegion != null){
                                $state.go('wholesaleGoodsList');
                            }
                        }
                    })

            }

            //进入商品批发列表
            $scope.goToWholesalwGoodsList = function(){
                $state.go('wholesaleGoodsList');
            };

            //申请皇冠按钮
            $scope.crownApplyAction = function(){
                $state.go('');
            };

            //取消按钮
            $scope.crownApplyCancelAction = function(){
                $state.go('home.sellerPage');
            };



        }]);