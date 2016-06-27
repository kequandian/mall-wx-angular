angular.module('category.service', [])
    .factory('CategoryFty', ['$http', '$q', 'GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取商品类别数据
            categoryService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_category";
                $http.get(url,{
                    headers: {
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