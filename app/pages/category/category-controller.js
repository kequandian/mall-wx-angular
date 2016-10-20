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
                                $scope.categoryItem = json.data;
                                //console.log('scope.categoryItem?'+angular.toJson($scope.categoryItem));
                                //console.log(angular.toJson(json.data))

                                $scope.getCategoryDetailData(json.data[0].id, json.data[0]);

                                cateLeftIndex.cate_detail_data_id = json.data[0].id;

                                $rootScope.cat_session.categoryItem = $scope.categoryItem;

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

            //$scope.indexPos = 0;
            $scope.indexPos = cateLeftIndex.cate_nav_index;

            $scope.getIndex = function (e, navCateId) {
                console.log('navCateId:  ' + navCateId);
                cateLeftIndex.cate_nav_index = e;
                cateLeftIndex.cate_detail_data_id = navCateId;
            };

            $scope.goToGoodsList = function (gItemtId) {
                goodListParams.typeNumber = gItemtId;
                goodListParams.searchStatus = 1;
                $state.go('goodsList')
            };

            //点击搜索栏
            $scope.cateGoToSearchPage = function(){
                $state.go('searchPage');
            };


            /* ==================================================== 分割线 ======================================================== */

            //first
            $scope.first_cate = [{
                id:0,
                name:'织物细条',
                itemList:[{
                    id:0,
                    name:'洁厕用品',
                    products:[{
                        id:1,
                        name:'商品1',
                        cover:'img/category/product-img.png',
                        price:12
                    },{
                        id:2,
                        name:'商品2',
                        cover:'img/category/product-img.png',
                        price:23
                    }]
                },{
                    id:1,
                    name:'日用报货',
                    products:[{
                        id:1,
                        name:'商品1',
                        cover:'img/category/product-img.png',
                        price:25
                    },{
                        id:2,
                        name:'商品2',
                        cover:'img/category/product-img.png',
                        price:62
                    },{
                        id:3,
                        name:'商品3',
                        cover:'img/category/product-img.png',
                        price:52
                    }]
                },{
                    id:2,
                    name:'厨厕清洁用品',
                    products:[]
                }]
            },{
                id:1,
                name:'日用洗护',
                itemList:[{
                    id:0,
                    name:'洁厕用品23',
                    products:[{
                        id:1,
                        name:'商品1',
                        cover:'img/category/product-img.png',
                        price:52
                    }]
                },{
                    id:1,
                    name:'日用报货45',
                    products:[{
                        id:1,
                        name:'商品1',
                        cover:'img/category/product-img.png',
                        price:52
                    },{
                        id:2,
                        name:'商品2',
                        cover:'img/category/product-img.png',
                        price:52
                    }]
                },{
                    id:2,
                    name:'厨厕清洁12',
                    products:[]
                },{
                    id:3,
                    name:'织物细条',
                    products:[]
                },{
                    id:4,
                    name:'日用洗护',
                    products:[]
                }]
            },{
                id:2,
                name:'厨房用品',
                itemList:[]
            },{
                id:3,
                name:'洁厕用品',
                itemList:[]
            },{
                id:4,
                name:'日用报货',
                itemList:[]
            }];

            $scope.indexFirstCate = 0;

            $scope.gFirstIndex = function(e, item){
                $scope.indexFirstCate = e;
                $scope.second_cate = item.itemList;
                $scope.indexSecondCate = 0;
                countItemWith(item);
                productList(item.itemList[0])
            };

            //second
            $scope.indexSecondCate = 0;
            $scope.second_cate = $scope.first_cate[0].itemList;

            $scope.gSecondIndex = function(e, item){
                $scope.indexSecondCate = e;
                $scope.productList = item.products;
            };

            //计算长度
            $scope.countWith = function(content){
                var count = content.length * 105 + 5;
                //console.log(count);
                count = "width:" + count + "px;";
                //console.log(count);
                return count;
            };

            countItemWith($scope.first_cate[0]);
            //second nav
            function countItemWith (content){
                if(content.itemList.length > 0){
                    var count = content.itemList.length * 105 + 5;
                    //console.log(count);
                    count = "width:" + count + "px;";
                    //console.log(count);
                    $scope.second_ul = count;
                }else{
                    $scope.second_ul = '';
                }
            }

            productList($scope.first_cate[0].itemList[0]);
            //products
            function productList(content){
                if(content.products.length > 0){
                    $scope.productList = content.products;
                    console.log("1234: " +angular.toJson($scope.productList))
                }else{
                    $scope.productList = null;
                }
            }

        }]);