angular.module('promotionOrder.service', [])
    .factory('PromotionOrderFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取销售订单数据
            promotionOrdersService: function (start_date, end_date) {
                var deferred = $q.defer();

                var options_string = (start_date===undefined || start_date==null) ? "" : ("?start_date=" + start_date + "&end_date=" + end_date);

                var url = GlobalVariable.SERVER_PATH + "/order_item_reward" + options_string;
                //console.log("url?"+url);

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