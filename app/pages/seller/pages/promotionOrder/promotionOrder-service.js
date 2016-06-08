angular.module('promotionOrder.service', [])
    .factory('PromotionOrderFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取销售订单数据
            promotionOrdersService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/order_item_reward";
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
            }

        }
    }]);