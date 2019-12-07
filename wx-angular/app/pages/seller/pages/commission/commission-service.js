angular.module('commission.service', [])
    .factory('CommissionFty', ['$http','$q', function($http,$q) {
        return{
            // 获取更新数据
            commissionService: function () {
                var deferred = $q.defer();
                var url = "/refresh";
                $http.get(url)
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            }
        }
    }]);