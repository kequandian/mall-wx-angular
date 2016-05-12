angular.module('userInfo.service', [])
    .factory('UserInfoFty', ['$http', '$q', function($http,$q) {
        return{
            // 获取个人信息数据
            myInfoService: function () {
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