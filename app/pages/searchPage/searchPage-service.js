angular.module('searchPage.service', [])
    .factory('SearchPageFty', ['$http', '$q', 'GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            //product_search?pageNumber=1&pageSize=20&name=abc&orderByDesc=view_count&orderBy=price&orderBy=sales
            searchProductService: function (productName) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_search?pageNumber=1&pageSize=20&name=" + productName;
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