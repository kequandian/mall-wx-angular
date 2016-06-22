angular.module('category.controller', ['category.service'])
    .controller('CategoryController', ['$scope', '$state', '$rootScope', 'CategoryFty',
        function ($scope, $state,$rootScope, CategoryFty) {

            //title
            document.title = "商品分类";
            $rootScope.tabsNumber = 2;

            detailsInfo();
            function detailsInfo() {
                CategoryFty.categoryService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.categoryItem = json.data;
                            //console.log('scope.categoryItem?'+angular.toJson($scope.categoryItem));
                            //alert(angular.toJson(json.data))

                            $scope.getCategoryDetailData(json.data[0].id);

                        } else {
                            console.log('获取商品分类失败');
                        }
                    }, function (error) {
                        console.log('获取商品分类失败');
                    })
            }

            // 点击左侧分类单
            $scope.getCategoryDetailData = function (typeNumber) {
                //if(CategoryPage.goods_list_go_back_number > 0){
                //    $scope.cateId = CategoryPage.cate_detail_data_id;
                //    CategoryPage.goods_list_go_back_number = 0;
                //}else {
                $scope.cateId = typeNumber;
                //console.log("cateid?"+$scope.cateId);
                //}
            };


            // 左侧分类单击样式修改
            $scope.categoryLeftClick = function (e) {
                e.target.className = 'nav-current';
                $(e.target).siblings().removeClass().addClass('nav-blur');
            };

            $scope.indexPos = 0;
            //$scope.indexPos = CategoryPage.cate_nav_index;

            $scope.getIndex = function (e, navCateId) {
                //CategoryPage.cate_nav_index = e;
                //CategoryPage.cate_detail_data_id = navCateId;
            };

            $scope.goToGoodsList = function (gItemtId) {
                //$state.go('goodsList',{typeNumber:gItemtId,productStatus:0})
                $state.go('goodsList', {typeNumber: gItemtId})
            }


        }]);