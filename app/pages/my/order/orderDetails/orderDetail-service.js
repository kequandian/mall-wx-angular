angular.module('orderDetails.service', [])
    .factory('OrderDetailsFty', ['$http', '$q','GlobalVariable', function($http, $q,GlobalVariable) {
        return {
            // ��ȡ��Ʒ�������
            orderDetailsService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/order";
                $http.get(url,{
                    headers: {
                        'Authorization': ACCESS_TOKEN
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