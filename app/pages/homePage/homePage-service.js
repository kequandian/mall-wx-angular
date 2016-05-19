angular.module('homePage.service', [])
    .factory('HomePageFty', ['$http', '$q','GlobalVariable',
        function($http,$q,GlobalVariable) {
            return{
                // 获取推荐商品数据
                recommendProductService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/product?pageNumber=1&pageSize=10";
                    $http.get(url)
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                // 获取广告
                getAdService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/ad";
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