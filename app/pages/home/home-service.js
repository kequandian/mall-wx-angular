angular.module('home.service', [])
    .factory('SimpleCartFty', ['$http','$q', 'GlobalVariable', function($http, $q, GlobalVariable) {
        return {
            getCarts: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/shopping_cart';
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        };
    }])
    .factory('ConfigFty', ['$http', '$q','GlobalVariable',
        function($http,$q,GlobalVariable) {
            return{
                getConfigs: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/global_config";
                    $http({
                        method: 'GET',
                        url: url,
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
            }
        }])
;