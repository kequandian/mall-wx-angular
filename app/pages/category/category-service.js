angular.module('category.service', [])
    .factory('CategoryFty', ['$http', '$q', 'GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取更新数据数据
            categoryService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_category";
                $http.get(url,{
                    headers: {
                        'Authorization': 'eyJ0b2tlbiI6ImZjOWYzZjFmOWQ3MWFjYmU5YmJkMjUxNzIxMzY1MTU5Nzc0NzYyOTMiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9'
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