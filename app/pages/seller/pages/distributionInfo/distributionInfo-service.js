angular.module('distributionInfo.service', [])
    .factory('DistributionInfoFty', ['$http','$q', function($http,$q) {
        return{
            // 获取分销信息数据
            distributionInfoService: function () {
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