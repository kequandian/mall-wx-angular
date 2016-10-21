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
        '$ocLazyLoad','cateLeftIndex', function ($scope, $state,$rootScope, CategoryFty,goodListParams, $ocLazyLoad, cateLeftIndex) {

            //title
            document.title = "商品分类";

            $rootScope.tabsNumber = 2;
            $rootScope.jqueryLoaded = false;

            $scope.top_btn_show = true;

            // 点击左侧分类单
            $scope.getCategoryDetailData = function (typeNumber, item) {
                //console.log('cate_detail_data_id:  ' + cateLeftIndex.goods_list_index);
                if(cateLeftIndex.goods_list_index > 0){
                    $scope.cateId = cateLeftIndex.cate_detail_data_id;
                    cateLeftIndex.goods_list_index = 0;
                }else {
                    $scope.cateId = typeNumber;
                }

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

            detailsInfo();

            function detailsInfo() {
                var loaded = false;
                if($rootScope.cat_session){
                    if($rootScope.cat_session.categoryItem) {
                        loaded = true;
                        //console.log('cat_session loaded')
                    }
                }else{
                    $rootScope.cat_session = {}
                }

                if(!loaded) {
                    CategoryFty.categoryService()
                        .then(function (json) {
                            if (json.status_code == 0) {
                                //$scope.categoryItem = json.data;
                                //console.log('scope.categoryItem?'+angular.toJson($scope.categoryItem));

                                //$scope.getCategoryDetailData(json.data[0].id, json.data[0]);

                                //cateLeftIndex.cate_detail_data_id = json.data[0].id;

                                //$rootScope.cat_session.categoryItem = $scope.categoryItem;

                                /*=====================================================*/
                                $scope.first_cate = json.data;
                                console.log(angular.toJson(json.data[0]));
                                $scope.second_cate = $scope.first_cate[0].sub_categories;
                                countWith($scope.first_cate);
                                countItemWith($scope.first_cate[0]);
                                productList($scope.first_cate[0].sub_categories[0].id);

                            } else {
                                console.log('获取商品分类失败');
                            }
                        }, function (error) {
                            console.log('获取商品分类失败');
                        })
                }else{
                    $scope.categoryItem = $rootScope.cat_session.categoryItem;
                    $scope.getCategoryDetailData($scope.categoryItem[0].id, $scope.categoryItem[0]);
                }
            }


            // 左侧分类单击样式修改
            /*$scope.categoryLeftClick = function (e) {

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
*/
            /* ==================================================== 分割线 ======================================================== */

            $scope.indexFirstCate = 0;

            $scope.gFirstIndex = function(e, item){
                $scope.indexFirstCate = e;
                $scope.second_cate = item.sub_categories;
                $scope.indexSecondCate = 0;
                countItemWith(item);
                productList(item.sub_categories[0].id)
            };

            //second
            $scope.indexSecondCate = 0;

            $scope.gSecondIndex = function(e, item){
                $scope.indexSecondCate = e;
                $scope.productList = item.products;
                console.log(angular.toJson(item));
                productList(item.id)
            };

            //计算长度
            function countWith(content){
                if(content.length > 0){
                    var count = content.length * 105 + 5;
                    count = "width:" + count + "px;";
                    $scope.first_ul = count;
                }else{
                    $scope.first_ul = '';
                }
                return count;
            }

            //second nav
            function countItemWith (content){
                if(content.sub_categories.length > 0){
                    var count = content.sub_categories.length * 105 + 5;
                    count = "width:" + count + "px;";
                    $scope.second_ul = count;
                }else{
                    $scope.second_ul = '';
                }
            }

            //products
            function productList(cateId){

                var orderBy = "&orderBy=price";
                var pageNumber = 1;
                var pageSize = 10;

                CategoryFty.getProductListService(cateId,pageNumber,pageSize,orderBy)
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.productList = json.data;
                            //console.log(angular.toJson($scope.productList))
                        }else{
                            $scope.productList = null;
                            console.log('获取商品列表失败：' + angular.toJson(error));
                        }
                    }, function(error){
                        console.log('获取商品列表失败：' + angular.toJson(error));
                    })
            }

            //推荐商品
            $scope.cateGoToDetails = function (item) {
                $state.go('details',{productId:item.id})
            };

            //加载更多
            $scope.home_load_more_product = function () {
                page_number += 1;
                $rootScope.rec_session.page_number = page_number;

                $rootScope.loading_in_progress = true;

                //getRecommendProduct(page_number, PAGE_SIZE);

                //ISSUE: not yet loaded here
                //$rootScope.rec_session.rec_product = $scope.rec_product;
            };

           /* //返回顶部
            $scope.onTop = function(){
                console.log('click to top');
                console.log(document.getElementById('pro-height').scrollTop);
                document.getElementById('pro-height').scrollTop = 0;
                $scope.pressed = true;
            };

            $scope.$on('$onScrollBottom', function () {
                if($rootScope.loading_in_progress) {
                    // do nothing
                }else{
                    if ($scope.home_load_more_btn_show) {
                        console.log('load more products...');
                        $scope.home_load_more_product();
                    }
                }
            });
            $scope.$on('$onScrollTop', function () {
                $timeout(function(){
                    $scope.top_btn_show = false;
                })
                //console.log('$onScrollTop');
            });
            $scope.$on('$onScrollTopCancelled', function () {
                $timeout(function(){
                    $scope.top_btn_show = true;
                })
                //console.log('$onScrollTopCancelled');
            });


            $scope.gotoDetail = function () {
                // get scroll position
                if (!$rootScope.scrolls) {
                    $rootScope.scrolls = {}
                }

                $rootScope.scrolls.yOffset = document.getElementById('category').scrollTop;
                $rootScope.scrolls.stacked = true;  //remember home stacked to details and will come back.

                console.log('anchor yOffset?' + $rootScope.scrolls.yOffset);
            };
            $scope.$on('$onFinishRender', function () {
                if ($rootScope.scrolls && $rootScope.scrolls.yOffset && $rootScope.scrolls.stacked) {
                    $rootScope.scrolls.stacked = false;

                    document.getElementById('category').scrollTop = $rootScope.scrolls.yOffset;

                    //$location.hash('content');
                    //$anchorScroll.yOffset = $rootScope.yOffset;
                }
            });
            //Do your $on in here, like this:
            $rootScope.$on("$locationChangeStart", function (event, next, current) {
                if ($rootScope.scrolls && !$rootScope.scrolls.stacked) {
                    $rootScope.scrolls.yOffset = 0;
                }
            });*/

        }]);