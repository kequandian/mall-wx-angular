angular.module('goodsList.controller', ['goodsList.service'])

    .controller('GoodsListController', ['$scope', '$state','$stateParams', 'GoodsListFty','searchInfo','goodListParams',
        function($scope,$state,$stateParams, GoodsListFty,searchInfo,goodListParams){

            document.title = "商品列表";

            /*$scope.priceIndex = "价格";
            $scope.priceStatus = function(){
                if($scope.priceIndex == "价格"){
                    $scope.priceIndex = "低到高";
                }else if($scope.priceIndex == "低到高"){
                    $scope.priceIndex = "高到低";
                }else if($scope.priceIndex == "高到低"){
                    $scope.priceIndex = "低到高";
                }
            };*/

            var orderBy = "";
            $scope.price_arrow = "arrow-status";
            $scope.price_arrow_hide = true;
            $scope.priceStatus = function(){
                $scope.price_arrow_hide = false;
                if($scope.price_arrow == "arrow-status"){
                    $scope.price_arrow = "arrow-status-up";
                    orderBy = "&orderBy=price";
                }else if($scope.price_arrow == "arrow-status-up"){
                    $scope.price_arrow = "arrow-status-down";
                    orderBy = "&orderByDesc=price";
                }else if($scope.price_arrow == "arrow-status-down"){
                    $scope.price_arrow = "arrow-status-up";
                    orderBy = "&orderBy=price";
                }
                addressList();
            };

            $scope.retArrowStatus = function(number){
                $scope.price_arrow = "arrow-status";
                $scope.price_arrow_hide = true;

                if(number == 1){
                    orderBy = "";
                }else if(number == 2){
                    orderBy = "&orderBy=view_count"
                }else if(number == 3){
                    orderBy = "&orderBy=sales"
                }
                addressList();
            };

            var s_status = goodListParams.searchStatus;
            if(s_status == 1){
                addressList();
            }else if(s_status == 2){
                $scope.productList = goodListParams.search_info;
                //console.log(angular.toJson($scope.productList));
            }

            function addressList(){
                var cateId = goodListParams.typeNumber;
                var pageNumber = 1;
                var pageSize = 20;

                GoodsListFty.goodsListService(cateId,pageNumber,pageSize,orderBy)
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.productList = json.data.products;
                            //console.log("productList?"+angular.toJson($scope.productList));
                        }else{
                            console.log("获取失败");
                        }
                    }, function(error){
                        console.log("获取失败");
                    })
            }


            //添加购物车
            $scope.addProductToCart = function(productId){
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
            };

    }]);