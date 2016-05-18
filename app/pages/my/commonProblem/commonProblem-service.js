angular.module('commonProblem.service', [])
    .factory('CommonProblemFty', ['$http','$q', function($http,$q) {
        return{
            // 获取常见问题数据
            commonProblemService: function () {
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