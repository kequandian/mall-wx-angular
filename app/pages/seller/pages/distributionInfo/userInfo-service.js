angular.module('userInfo.service', [])
    .factory('UserInfoFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取个人信息数据
            myInfoService: function () {
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
            },

            // 提交个人信息数据
            postInfoService: function (name,phone) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/profile";
                $http.post(url,{
                    "name":name,
                    "phone": phone
                },{
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