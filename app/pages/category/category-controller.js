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
        '$ocLazyLoad', function ($scope, $state,$rootScope, CategoryFty,goodListParams, $ocLazyLoad) {

            //title
            document.title = "商品分类";

            $rootScope.tabsNumber = 2;

            $rootScope.jqueryLoaded = false;

            detailsInfo();
            function detailsInfo() {
                CategoryFty.categoryService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.categoryItem = json.data;
                            //console.log('scope.categoryItem?'+angular.toJson($scope.categoryItem));
                            //console.log(angular.toJson(json.data))

                            $scope.getCategoryDetailData(json.data[0].id, json.data[0]);

                        } else {
                            console.log('获取商品分类失败');
                        }
                    }, function (error) {
                        console.log('获取商品分类失败');
                    })
            }

            // 点击左侧分类单
            $scope.getCategoryDetailData = function (typeNumber, item) {
                //if(CategoryPage.goods_list_go_back_number > 0){
                //    $scope.cateId = CategoryPage.cate_detail_data_id;
                //    CategoryPage.goods_list_go_back_number = 0;
                //}else {
                $scope.cateId = typeNumber;
                //}

                var cateCount = 0;
                if(item.sub_categories != null && item.sub_categories.length > 0){
                    cateCount++;
                    //console.log(cateCount + ": " + angular.toJson(item.sub_categories));
                }
                if(item.sub_categories != null && item.sub_categories.length > 0 && item.sub_categories[0].sub_categories != null && item.sub_categories[0].sub_categories.length > 0){
                    cateCount++;
                    //console.log(cateCount + ": " + angular.toJson(item.sub_categories));
                }
                //if(item.sub_categories != null && item.sub_categories.length > 0 && item.sub_categories[0].sub_categories != null && item.sub_categories[0].sub_categories.length > 0 &&
                //    item.sub_categories[0].sub_categories[0].sub_categories != null &&item.sub_categories[0].sub_categories[0].sub_categories.length > 0){
                //    cateCount++;
                //    console.log(cateCount + ": " + angular.toJson(item.sub_categories));
                //}

                $scope.cateCoumt = cateCount;

            };


            // 左侧分类单击样式修改
            $scope.categoryLeftClick = function (e) {

                if($rootScope.jqueryLoaded){
                    console.log('Jquery loaded');
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
                }else {
                    console.log('Jquery not loaded');
                    $ocLazyLoad.load('Jquery').then(function () {
                        console.log('Jquery loading and loaded');

                        $rootScope.jqueryLoaded = true;

                        e.target.className = 'nav-current';
                        $(e.target).siblings().removeClass().addClass('nav-blur');

                        /// set previous item class
                        if ($(e.target).prev()) {
                            var pre = $(e.target).prev()[0];
                            if (pre) {
                                pre.className = 'nav-prev';
                            }
                            //console.log("target: " + angular.toJson(pre) + 'class-name?' + pre.className);
                        }
                    })
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
            };

            //点击搜索栏
            $scope.cateGoToSearchPage = function(){
                $state.go('searchPage');
            }
        }]);