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
                        alert(angular.toJson($scope.collection_list));
                    }
                }, function(error){
                    $.toast('获取收藏列表失败', 'cancel');
                })
        }
    }])
;