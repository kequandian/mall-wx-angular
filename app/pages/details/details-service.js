angular.module('details.service', [])
    .factory('DetailsFty', ['$http', '$q', 'GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取更新数据数据
            detailsService: function (productId) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product/" + productId;
                $http.get(url,{
                    headers: {
                        'Authorization': ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            },

            //加入购物车
            addProToCatService: function (productId) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/shopping_cart";
                $http.post(url,[{
                    "product_id": productId,
                    "quantity": 1
                }],{
                    headers: {
                        'Authorization': ACCESS_TOKEN
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