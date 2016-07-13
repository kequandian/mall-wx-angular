angular.module('commonProblem.service', [])
    .factory('CommonProblemFty', ['$http','$q', "GlobalVariable", function($http, $q,GlobalVariable) {
        return{
            // 获取常见问题数据
            commonProblemService: function (name) {
                var deferred = $q.defer();
                var url      = GlobalVariable.SERVER_PATH + "/faq?type=" + name + "&pageNumber=1&pageSize=20";
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
            },

            // 获取问题API数据
            problemTypeService: function () {
                var deferred = $q.defer();
                var url      = GlobalVariable.SERVER_PATH + "/faq_type";
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