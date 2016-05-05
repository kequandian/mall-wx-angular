angular.module('promotionOrder.service', [])
    .factory('PromotionOrderFty', ['$http', function($http) {
        return{
            // 获取更新数据数据
            promotionOrdersService: function () {
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