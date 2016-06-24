angular.module('category.controller', ['category.service'])
    .filter('cate', function(){
        return function(input, cateId){
            var rows = [];
            angular.forEach(input, function(item){
               if(item.id == cateId){
                   rows.push(item);
               }
            });
            return rows;
        }
    })
    .filter('defaultCover', function(){
        return function(input){
            if(input==null){
                return 'img/category/category_cover.png'
            }
            return input;
        }
    })
    .controller('CategoryController', ['$scope', '$state', '$rootScope', 'CategoryFty','goodListParams',
        function ($scope, $state,$rootScope, CategoryFty,goodListParams) {

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
                //}
            };


            // 左侧分类单击样式修改
            $scope.categoryLeftClick = function (e) {
                e.target.className = 'nav-current';
                $(e.target).siblings().removeClass().addClass('nav-blur');

                /// set previous item class
                if($(e.target).prev()) {
                    var pre = $(e.target).prev()[0];
                    if(pre) {
                        pre.className = 'nav-prev';
                    }
                    //console.log("target: " + angular.toJson(pre) + 'class-name?' + pre.className);
                }
            };

            $scope.indexPos = 0;
            //$scope.indexPos = CategoryPage.cate_nav_index;

            $scope.getIndex = function (e, navCateId) {
                //CategoryPage.cate_nav_index = e;
                //CategoryPage.cate_detail_data_id = navCateId;
            };

            $scope.goToGoodsList = function (gItemtId) {
                goodListParams.typeNumber = gItemtId;
                goodListParams.searchStatus = 1;
                $state.go('goodsList')
            }


        }]);