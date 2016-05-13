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



    }]);