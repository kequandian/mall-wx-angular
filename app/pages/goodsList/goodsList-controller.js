angular.module('goodsList.controller', ['goodsList.service'])

    .controller('GoodsListController', ['$scope', '$state','$stateParams', 'GoodsListFty',
        function($scope,$state,$stateParams, GoodsListFty){

            document.title = "商品列表";

            addressList();
            function addressList(){

                var cateId = $stateParams.typeNumber;

                GoodsListFty.goodsListService(cateId)
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.productList = json.data.products;
                        }else{
                            console.log("获取失败")
                        }
                    }, function(error){
                        console.log("获取失败")
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