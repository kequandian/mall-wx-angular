angular.module('goodsList.controller', ['goodsList.service'])

    .controller('GoodsListController', ['$scope', '$state', '$stateParams', '$rootScope', 'GoodsListFty', 'searchInfo', 'goodListParams', 'areasStatus',
        function ($scope, $state, $stateParams, $rootScope, GoodsListFty, searchInfo, goodListParams, areasStatus) {


            document.title = "商品列表";

            var orderBy = "";
            var pageNumber = 1;
            var pageSize = 20;

            var s_status = goodListParams.searchStatus;
            $scope.load_more_btn_show = false;

            if (s_status == 1) {
                // from category
                //console.log("cate goodsList");
                cateProductList(pageNumber, pageSize);
            } else if (s_status == 2) {
                // from search
                //console.log("search goodsList");
                $scope.productList = searchInfo.search_info;
                if ($scope.productList.length >= 20) {
                    $scope.load_more_btn_show = true;
                }
            } else if (s_status == 3) {
                console.log("areas goodsList");
                areasProductList(pageNumber, pageSize);
            }

            //价格切换
            $scope.arrow = "both";
            $scope.price_arrow_hide = true;
            $scope.priceStatus = function () {
                $scope.price_arrow_hide = false;

                pageNumber = 1;

                if ($scope.arrow == "both") {
                    $scope.arrow = "asc";
                    orderBy = "&orderBy=price";
                } else if ($scope.arrow == "asc") {
                    $scope.arrow = "desc";
                    orderBy = "&orderByDesc=price";
                } else if ($scope.arrow == "desc") {
                    $scope.arrow = "asc";
                    orderBy = "&orderBy=price";
                }

                if (s_status == 1) {
                    cateProductList(pageNumber, pageSize);
                } else if (s_status == 2) {
                    searchProductList(pageNumber, pageSize)
                } else if (s_status == 3) {
                    areasProductList(pageNumber, pageSize)
                }
            };

            $scope.retArrowStatus = function (number) {

                $scope.arrow = "both";
                $scope.price_arrow_hide = true;

                pageNumber = 1;

                if (number == 1) {
                    orderBy = "";
                } else if (number == 2) {
                    orderBy = "&orderBy=view_count"
                } else if (number == 3) {
                    orderBy = "&orderBy=sales"
                }

                if (s_status == 1) {
                    cateProductList(pageNumber, pageSize);
                } else if (s_status == 2) {
                    searchProductList(pageNumber, pageSize);
                } else if (s_status == 3) {
                    areasProductList(pageNumber, pageSize);
                }
            };


            //分类---商品列表
            function cateProductList(pageNumber, pageSize) {
                var cateId = goodListParams.typeNumber;

                GoodsListFty.goodsListService(cateId, pageNumber, pageSize, orderBy)
                    .then(function (json) {
                        //alert(angular.toJson(json.data));
                        if (json.status_code == 0) {
                            if (pageNumber == 1) {
                                $scope.productList = json.data.products;
                                if ($scope.productList.length >= 20) {
                                    $scope.load_more_btn_show = true;
                                } else {
                                    $scope.load_more_btn_show = false;
                                }
                            } else if (pageNumber > 1) {
                                var new_code = json.data.products;
                                if (new_code.length > 0) {
                                    angular.forEach(new_code, function (v, k) {
                                        $scope.productList.push(v);
                                    });
                                    if(new_code.length < 20){
                                        $scope.load_more_btn_show = false;
                                        $.toast("已加载全部的商品");
                                    }
                                } else if (new_code.length == 0) {

                                    $scope.load_more_btn_show = false;
                                    $.toast("暂无更多的分类商品信息");
                                }

                            }

                        } else {
                            console.log("获取失败");
                        }
                    }, function (error) {
                        //alert(angular.toJson(error));
                        console.log("获取失败");
                    })
            }


            //搜索--商品列表
            function searchProductList(pageNumber, pageSize) {

                var p_name = searchInfo.search_name;

                GoodsListFty.sGoodsProductService(p_name, pageNumber, pageSize, orderBy)
                    .then(function (json) {
                        //alert(angular.toJson(json));
                        if (json.status_code == 0) {
                            if (pageNumber == 1) {
                                $scope.productList = json.data;
                                if ($scope.productList.length >= 20) {
                                    $scope.load_more_btn_show = true;
                                } else {
                                    $scope.load_more_btn_show = false;
                                }
                            } else if (pageNumber > 1) {
                                var new_code = json.data;
                                if (new_code.length > 0) {
                                    angular.forEach(new_code, function (v, k) {
                                        $scope.productList.push(v);
                                    });
                                } else if (new_code.length == 0) {
                                    $.toast("暂无更多的搜索商品信息");
                                }
                            }
                        }
                    }, function (error) {
                        console.log(error)
                    })
            }

            //添加购物车
            /*$scope.addProductToCart = function(productId){
             GoodsListFty.addProToCatService(productId)
             .then(function(json){
             if(json.status_code == 0){
             $.toast.prototype.defaults.duration = 2000;
             $.toast("成功添加商品");
             }else{
             $.toast("添加失败", "cancel");
             }
             }, function(error){
             $.toast("添加失败", "cancel");
             })
             };*/

            //分区商品列表
            function areasProductList(pageNumber, pageSize) {

                var zone = areasStatus.areas_status;

                GoodsListFty.areasProductService(zone, pageNumber, pageSize, orderBy)
                    .then(function (json) {
                        //alert(angular.toJson(json));
                        if (json.status_code == 0) {
                            if (pageNumber == 1) {
                                $scope.productList = json.data;
                                if ($scope.productList.length >= 20) {
                                    $scope.load_more_btn_show = true;
                                } else {
                                    $scope.load_more_btn_show = false;
                                }
                            } else if (pageNumber > 1) {
                                var new_code = json.data;
                                if (new_code.length > 0) {
                                    angular.forEach(new_code, function (v, k) {
                                        $scope.productList.push(v);
                                    });
                                } else if (new_code.length == 0) {
                                    $.toast("暂无更多的分区商品信息");
                                }
                            }
                        }
                    }, function (error) {
                        console.log(error)
                    })
            }

            ////滚动加载
            /* var loading = false;  //状态标记
             $("#goodsList_content").infinite().on("infinite", function() {
             if(loading){
             return;
             }
             loading = true;
             setTimeout(function() {

             if (s_status == 1) {
             alert(1);
             //cateProductList();
             } else if (s_status == 2) {
             alert(2);
             loading = true;
             return;
             //$("#goodsList_content").destroyInfinite();
             //searchProductList();
             } else if (s_status == 3) {
             alert(3);
             //areasProductList();
             }

             loading = false;
             }, 1000);   //模拟延迟
             });*/

            $scope.load_more_products = function () {
                pageNumber += 1;
                //pageSize = 20;

                if (s_status == 1) {
                    cateProductList(pageNumber, pageSize);
                } else if (s_status == 2) {
                    searchProductList(pageNumber, pageSize);
                } else if (s_status == 3) {
                    areasProductList(pageNumber, pageSize);
                }
            };

            $scope.gotoDetail = function(){
                // get scroll position
                $rootScope.yOffset = document.getElementById('product_list_content').scrollTop;
                console.log('anchor yOffset?'+$rootScope.yOffset);
            };

            $scope.$on('$onFinishRender', function(){
                if($rootScope.yOffset && $rootScope.yOffset > 0) {
                    document.getElementById('product_list_content').scrollTop = $rootScope.yOffset;
                    //$location.hash('content');
                    //$anchorScroll.yOffset = $rootScope.yOffset;
                }
            })

        }]);