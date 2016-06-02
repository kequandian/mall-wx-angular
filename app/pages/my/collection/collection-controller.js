angular.module('collection.controller', ['collection.service'])

    .controller('CollectionController', ['$scope', '$state', 'CollectionFty', function($scope,$state, CollectionFty){

        //title
        document.title = "我的收藏";

        //我的收藏
        getCollectionList();

        function getCollectionList(){
            CollectionFty.collectionService()
                .then(function(json){
                    if(json.status_code == 0){
                        $scope.collection_list = json.data;
                        //alert(angular.toJson($scope.collection_list));
                    }
                }, function(error){
                    $.toast('获取收藏列表失败', 'cancel');
                })
        }

        //编辑
        $scope.edit_action_text = "编辑";
        $scope.coll_item_close = true;
        $scope.edit_action = function(){
            if($scope.edit_action_text == "编辑") {
                $scope.edit_action_text = "取消";
                $scope.coll_item_close = false;
                $scope.edit_action_img = true;
            }else if($scope.edit_action_text == "取消") {
                $scope.edit_action_text = "编辑";
                $scope.coll_item_close = true;
                $scope.edit_action_img = false;
            }
        };

        //移除收藏商品
        $scope.delete_coll_item = function(coll_id){
            CollectionFty.deleteCollectionSerivce(coll_id)
                .then(function(json){
                    if(json.status_code == 0){
                        $.toast('移除成功');
                        //alert(angular.toJson($scope.collection_list));
                    }
                }, function(error){
                    $.toast('移除失败', 'cancel');
                })
        }
    }])
;