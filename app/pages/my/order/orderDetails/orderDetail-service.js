angular.module('orderDetails.service', [])
    .factory('OrderDetailsFty', ['$http', '$q','GlobalVariable', function($http, $q,GlobalVariable) {
        return {
            // 获取商品类别数据
            orderDetailsService: function (orderNumber) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/order/" + orderNumber;
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
        };
    }]);