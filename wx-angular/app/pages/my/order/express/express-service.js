/**
 * 物流详情
 *
 * @author Jimmie Hwang
 * @create 2016/6/15
 *
 */

angular.module("express.service", [])
    .factory("ExpressInfo", ["$http", "$q", "GlobalVariable", function($http, $q, GlobalVariable) {
        return {
            ExpressService: function(orderNumber) {
                var deferred = $q.defer();
                var url      = GlobalVariable.SERVER_PATH + "/express_info?order_number=" + orderNumber;
                $http.get(url,{
                    headers:{
                        "Authorization": GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data){
                        return deferred.resolve(data);
                    }).error(function (data){
                    return deferred.reject(data);
                });

                return deferred.promise;
            }

        }
    }]);