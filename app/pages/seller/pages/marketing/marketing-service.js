angular.module('marketing.service', [])
    .factory('MarketingFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取我的团队
            marketingService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/seller";
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