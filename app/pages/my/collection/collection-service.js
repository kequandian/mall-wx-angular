angular.module('collection.service', [])
    .factory('CollectionFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取收藏商品数据
            collectionService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_favorite";
                $http.get(url,{
                    headers:{
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            },

            //移除收藏商品
            deleteCollectionSerivce:function(coll_id){
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_favorite/"+ coll_id;
                $http.delete(url,{
                    headers:{
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            }
        }
    }]);