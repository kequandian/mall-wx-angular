angular.module('searchPage.service', [])
    .factory('SearchPageFty', ['$http', '$q', 'GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            //商品搜索product_hit_word
            searchProductService: function (productName) {
                var deferred = $q.defer();
                var condition = !(productName===undefined || productName===null || productName.length==0);
                var url = GlobalVariable.SERVER_PATH + "/product_search?pageNumber=1&pageSize=20" + condition ? ("&name=" + productName) : "";
                $http.get(url)
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            },

            //获取热门关键字
            productHitWordService: function (productName) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_hit_word";
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