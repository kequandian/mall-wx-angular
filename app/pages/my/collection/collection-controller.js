angular.module('collection.controller', ['collection.service'])

    .controller('CollectionController', ['$scope', '$state', 'CollectionFty',
        '$ocLazyLoad', function ($scope, $state, CollectionFty, $ocLazyLoad) {

            //title
            document.title = "我的收藏";

            $scope.coll_null = true;
            $scope.coll_content_null = true;

            //我的收藏
            getCollectionList();
            function getCollectionList() {
                CollectionFty.collectionService()
                    .then(function (json) {
                        //alert(angular.toJson(json))
                        if (json.status_code == 0) {
                            $scope.collection_list = json.data;
                            if ($scope.collection_list.length > 0) {
                                $scope.coll_null = true;
                                $scope.coll_content_null = false;
                            } else {
                                $scope.coll_null = false;
                                $scope.coll_content_null = true;
                            }
                            //alert(angular.toJson($scope.collection_list));
                        }
                    }, function (error) {
                        $.toast('获取收藏列表失败', 'cancel');
                    })
            }

            //编辑
            $scope.edit_action_text = "编辑";
            $scope.coll_item_close = true;
            $scope.edit_action = function () {
                if ($scope.edit_action_text == "编辑") {
                    $scope.edit_action_text = "取消";
                    $scope.coll_item_close = false;
                    $scope.edit_action_img = true;
                } else if ($scope.edit_action_text == "取消") {
                    $scope.edit_action_text = "编辑";
                    $scope.coll_item_close = true;
                    $scope.edit_action_img = false;
                }
            };

            //移除收藏商品
            $scope.delete_coll_item = function (coll_id) {

                $ocLazyLoad.load('Jquery').then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {
                        /*start*/
                        $.confirm("", "确认删除?", function () {
                            CollectionFty.deleteCollectionSerivce(coll_id)
                                .then(function (json) {
                                    if (json.status_code == 0) {
                                        $.toast('删除成功');
                                        $state.go('collection', {}, {reload: true});
                                        //alert(angular.toJson($scope.collection_list));
                                    }
                                }, function (error) {
                                    $.toast('删除失败', 'cancel');
                                })
                        }, function () {
                            //取消操作
                        });
                        /*end*/
                    })
                });
            }
        }])
;