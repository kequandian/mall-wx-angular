angular.module('goodsList.controller', ['goodsList.service'])

    .controller('GoodsListController', ['$scope', '$state', 'GoodsListFty', function($scope,$state, GoodsListFty){

        document.title = "商品列表";
        addressList();
        function addressList(){
            GoodsListFty.productCategoryService()
                .then(function(json){
                    if(json.status_code == 0){
                        $scope.productList = json.data[0].sub_categories;

                    }else{
                        console.log("获取失败")
                    }
                }, function(error){
                    console.log("获取失败")
                })

        }



    }]);