angular.module('wholesaleGoodsList.controller', ['wholesaleGoodsList.service'])
    .filter('defaultWholesaleCover', function(){
        return function(input){
            if(input==null){
                return 'img/category/category_cover.png'
            }
            return input;
        }
    })
        .controller('WholesaleGoodsListController', ['$scope','$state','$stateParams','$rootScope', 'WholesaleGoodsListFty','wCateCache',
        function($scope,$state,$stateParams,$rootScope, WholesaleGoodsListFty,wCateCache){

            document.title = '商品批发';

            //自动关闭省市区弹出框
            var scope1 = $rootScope;
            scope1.$watch('closePCD',function(nValue, oValue){
                $('.close-picker').click();
                $('#city-picker').click();
            });
            //初始化
            initCode();
            function initCode(){
                getNavInfo();
                //getWholesaleGoodsList(1);
            }

            function getNavInfo(){
                WholesaleGoodsListFty.getNavService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.nav_list = json.data;
                            console.log("导航信息：" + angular.toJson(json));
                        }else{
                            console.log("获取导航信息失败：" + angular.toJson(json));
                        }
                    }, function(error) {
                        console.log("获取导航信息失败：" + angular.toJson(error));
                    }).finally(function(){
                        if($scope.nav_list != null && $scope.nav_list.length > 0){
                            if(wCateCache.codeItem == null){
                                getWholesaleGoodsList($scope.nav_list[0].id);
                            }else{
                                getWholesaleGoodsList(wCateCache.codeItem.id);
                            }
                        }
                    })
            }

            function getWholesaleGoodsList(cateId){
                WholesaleGoodsListFty.getWholesaleGoodsListService(cateId)
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.wGoodsList = json.data.list;
                            //console.log("商品批发列表：" + angular.toJson(json));
                        }else{
                            console.log("获取商品批发列表失败：" + angular.toJson(json));
                        }
                    }, function(error) {
                        console.log("获取商品批发列表失败：" + angular.toJson(error));
                    }).finally(function(){

                    })

            }

            $scope.indexNavCate = wCateCache.index_first;

            $scope.wNavIndex = function(e, item){
                $scope.indexNavCate = e;

                if(item != null){
                    getWholesaleGoodsList(item.id);
                }else{
                    console.log('item is null');
                }
                wCateCache.index_first = e;
                wCateCache.codeItem = item;
                //console.log(angular.toJson(item));
            };

            //进入批发详情
            $scope.cateGoToWholesaleDetails = function(item){
                $state.go('wholesaleDetails', {wholesaleId : item.id});
            }




        }]);