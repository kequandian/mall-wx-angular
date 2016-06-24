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

            $scope.price_arrow = "arrow-status";
            $scope.price_arrow_hide = true;
            $scope.priceStatus = function(){
                $scope.price_arrow_hide = false;
                if($scope.price_arrow == "arrow-status"){
                    $scope.price_arrow = "arrow-status-up";
                }else if($scope.price_arrow == "arrow-status-up"){
                    $scope.price_arrow = "arrow-status-down";
                }else if($scope.price_arrow == "arrow-status-down"){
                    $scope.price_arrow = "arrow-status-up";
                }
            };

            $scope.retArrowStatus = function(){
                $scope.price_arrow = "arrow-status";
                $scope.price_arrow_hide = true;
            };

            var s_status = goodListParams.searchStatus;
            if(s_status == 1){
                addressList();
            }else if(s_status == 2){
                $scope.productList = goodListParams.search_info;
                //alert($scope.productList);
            }

            function addressList(){

                var cateId = goodListParams.typeNumber;

                GoodsListFty.goodsListService(cateId)
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.productList = json.data.products;
                        }else{
                            console.log("获取失败");
                        }
                    }, function(error){
                        console.log("获取失败");
                    })
            }


            //添加购物车
            $scope.addProductToCart = function(productId){
                var proId = productId;
                var count = 1;
                GoodsListFty.addProToCatService(proId)
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