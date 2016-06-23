angular.module('commonProblem.service', [])
    .factory('CommonProblemFty', ['$http','$q', "GlobalVariable", function($http, $q,GlobalVariable) {
        return{
            // 获取常见问题数据
            commonProblemService: function () {
                var deferred = $q.defer();
                var url      = GlobalVariable.SERVER_PATH + "/faq?type=FN&pageNumber=1&pageSize=20";
                $http.get(url, {
                    headers: {
                        "Authorization": GlobalVariable.ACCESS_TOKEN

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