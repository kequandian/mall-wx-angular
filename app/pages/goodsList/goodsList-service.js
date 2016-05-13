angular.module('goodsList.service', [])
    .factory('GoodsListFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取商品类别数据
            goodsListService: function (cateId) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_category/" + cateId;
                $http.get(url)
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            }
        }
    }]);