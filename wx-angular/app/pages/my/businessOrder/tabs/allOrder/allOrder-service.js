angular.module('allOrder.service', [])
    .factory('AllOrderFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取商家订单
            allOrdersService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/merchant/order?status=DELIVERED_CONFIRM_PENDING";
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
        }
    }]);