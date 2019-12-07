angular.module('businessOrderDetails.service', [])
    .factory('BusinessOrderDetailsFty', ['$http', '$q','GlobalVariable', function($http, $q,GlobalVariable) {
        return {
            // 获取订单详情数据
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
            },

            //确认订单
            closeOrderService: function (order_number) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/order/" + order_number;
                $http.put(url, {
                    "status":"CLOSED_CONFIRMED"
                }, {
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