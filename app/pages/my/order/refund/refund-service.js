angular.module('refund.service', [])
    .factory('refund', ['$http', '$q','GlobalVariable', function($http, $q,GlobalVariable) {
        return {
            // 获取商品类别数据
            refundService: function (orderNumber) {
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