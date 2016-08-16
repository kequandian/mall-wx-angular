angular.module('my.order.service', [])
    .factory('OrderFty', ['$http', '$q','GlobalVariable', function($http, $q,GlobalVariable) {
        return {
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

            deliverReminderService: function (order_number) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/order_deliver_reminder/" + order_number;
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
            },

            //É¾³ý¶©µ¥{"status":"CLOSED_PAY_TIMEOUT"},
            deleteOverTimeOrderService: function (order_number) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/order/" + order_number;
                $http.delete(url, {
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