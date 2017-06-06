angular.module('wholesaleGoodsList.service', [])
    .factory('WholesaleGoodsListFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取我的团队
            shopSettingsService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/seller";
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