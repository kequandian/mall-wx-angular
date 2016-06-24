angular.module('my.order.service', [])
    .factory('OrderFty', ['$http', '$q','GlobalVariable', function($http, $q,GlobalVariable) {
        return {
            // 获取订单数据
            ordersService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/order";
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

            // 确认订单
            closeOrderService: function (order_number, order_status) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/order/" + order_number;
                $http.put(url,{
                    "status": order_status
                },{
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