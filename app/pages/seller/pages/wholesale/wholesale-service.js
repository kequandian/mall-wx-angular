angular.module('wholesale.service', [])
    .factory('WholesaleFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取批发商品
            getWholesaleInfoService: function (cateId) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/wholesale?categoryId=1";
                $http.get(url,{
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
    }]);