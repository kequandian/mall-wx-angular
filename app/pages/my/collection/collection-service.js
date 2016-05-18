angular.module('collection.service', [])
    .factory('CollectionFty', ['$http','$q', function($http,$q) {
        return{
            // 获取常见问题数据
            collectionService: function () {
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