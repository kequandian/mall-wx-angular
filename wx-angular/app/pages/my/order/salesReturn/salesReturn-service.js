/**
 * 申请退货
 *
 * @author Jimmie Hwang
 * @create 2016/6/16
 *
 */

angular.module("salesReturn.service", [])
    .factory("SalesReturnInfo", ["$http", "$q", "GlobalVariable", function ($http, $q, GlobalVariable) {
        return {

            //提交退货信息
            SalesReturnService: function (order_number, service_type, reason, content, image_list) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/order_customer_service";
                $http.post(url, {
                    "order_number": order_number,
                    "service_type": service_type,
                    "reason": reason,
                    "content": content,
                    "images": image_list
                }, {
                    headers: {
                        "Authorization": GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        return deferred.resolve(data);

                    }).error(function (data) {
                        return deferred.reject(data);
                    });

                return deferred.promise;
            },

            getReturnCauses: function () {

                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/customer_service_type";
                $http.get(url, {
                    headers: {
                        "Authorization": GlobalVariable.ACCESS_TOKEN
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