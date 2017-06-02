angular.module('pieceGroupGoodsList.controller', ['pieceGroupGoodsList.service'])

    .controller('PieceGroupGoodsListController', ['$scope', '$state', '$stateParams', '$rootScope', 'PieceGroupGoodsListFty',
        function ($scope, $state, $stateParams, $rootScope, PieceGroupGoodsListFty) {

            document.title = "团长免单";

            //拼团优惠券

            //获取免单商品
            getPieceGroupGoodsList();

            function getPieceGroupGoodsList(){

                PieceGroupGoodsListFty.pieceGroupGoodsListService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.pieceGroupGoodsList = json.data.list;
                            $scope.coupon_item = $rootScope.pieceGroupCouponItem;
                            //console.log(angular.toJson($scope.coupon_item));
                        }else{
                            console.log('获取免单商品信息失败：' + angular.toJson(json));
                        }
                    },function(error){
                        console.log('获取免单商品信息失败：' + angular.toJson(error));
                    })

            }

            //时间格式化
            $scope.dateConvert = function(time){
                var newTime = time.split(' ');
                return newTime[0];
            };


            $scope.goToOpenGroup = function(item){
                console.log('获取免单商品信息失败：' + angular.toJson(item));
                $state.go('piecegroup',{pieceGroupId:item.id, masterId:0});
            };


        }]);