angular.module('wholesaleGoodsList.controller', ['wholesaleGoodsList.service'])
    .filter('defaultWholesaleCover', function(){
        return function(input){
            if(input==null){
                return 'img/category/category_cover.png'
            }
            return input;
        }
    })
        .controller('WholesaleGoodsListController', ['$scope','$state', 'WholesaleGoodsListFty','wCateCache',
        function($scope,$state, WholesaleGoodsListFty,wCateCache){

            document.title = '商品批发';

            //初始化
            initCode();
            function initCode(){
                //getNavInfo();
                getWholesaleGoodsList(1);
            }

            function getNavInfo(){
                WholesaleGoodsListFty.getNavService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.navList = json.data.list;
                            console.log("导航信息：" + angular.toJson(json));
                        }else{
                            console.log("获取导航信息失败：" + angular.toJson(json));
                        }
                    }, function(error) {
                        console.log("获取导航信息失败：" + angular.toJson(error));
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

            $scope.first_cate_nav = [{
                name:'text'
            },{
                name:'text1'
            },{
                name:'text2'
            }];

            $scope.indexFirstCate = wCateCache.index_first;

            $scope.gFirstIndex = function(e, item){
                $scope.indexFirstCate = e;
                //$scope.second_cate = item.sub_categories;
                $scope.indexSecondCate = 0;
                //pageNumber = 1;
                //if(item.sub_categories.length > 0){
                //    productList(item.sub_categories[0].id);
                //    wCateCache.product_id = item.sub_categories[0].id;
                //}else{
                //    productList(item.id);
                //    wCateCache.product_id = item.id;
                //}
                wCateCache.index_first = e;
                wCateCache.second_cate = item;
                wCateCache.index_second = 0;

                //console.log(angular.toJson(item));
            };

            //进入批发详情
            $scope.cateGoToWholesaleDetails = function(item){
                $state.go('wholesaleDetails', {wholesaleId : item.id});
            }




        }]);