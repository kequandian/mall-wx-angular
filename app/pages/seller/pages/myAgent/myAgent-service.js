angular.module('myAgent.service', [])
    .factory('MyAgentFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取更新数据数据
            myAgentService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_favorite";
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
        }
    }]);