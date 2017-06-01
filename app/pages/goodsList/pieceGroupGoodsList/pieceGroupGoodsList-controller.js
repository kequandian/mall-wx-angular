angular.module('pieceGroupGoodsList.controller', ['pieceGroupGoodsList.service'])

    .controller('PieceGroupGoodsListController', ['$scope', '$state', '$stateParams', '$rootScope', 'PieceGroupGoodsListFty',
        function ($scope, $state, $stateParams, $rootScope, PieceGroupGoodsListFty) {

            document.title = "团长免单";

            //获取免单商品
            getPieceGroupGoodsList();

            function getPieceGroupGoodsList(){

                PieceGroupGoodsListFty.pieceGroupGoodsListService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.pieceGroupGoodsList = json.data.list;
                        }else{
                            console.log('获取免单商品信息失败：' + angular.toJson(json));
                        }
                    },function(error){
                        console.log('获取免单商品信息失败：' + angular.toJson(error));
                    })

            }


            $scope.goToOpenGroup = function(item){
                $state.go('piecegroup',{pieceGroupId:item.id, masterId:0});
            };


        }]);