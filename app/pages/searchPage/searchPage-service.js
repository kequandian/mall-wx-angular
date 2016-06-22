angular.module('searchPage.service', [])
    .factory('SearchPageFty', ['$http', '$q', 'GlobalVariable', function($http,$q,GlobalVariable) {
        return{

            searchProductService: function (productId) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product/" + productId;
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