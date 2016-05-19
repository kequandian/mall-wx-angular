angular.module('my.service', [])
    .factory('MyFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return {
            // 获取分销个人信息数据
            userInfoService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/profile";
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
        };
    }]);