angular.module('wholesaleGoodsList.service', [])
    .factory('WholesaleGoodsListFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            //获取商品批发导航信息
            getNavService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/wholesale_category";
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
            },
            // 获取商品批发
            getWholesaleGoodsListService: function (cateId) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/wholesale?categoryId=" + cateId;
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