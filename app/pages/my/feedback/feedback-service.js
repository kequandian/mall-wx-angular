angular.module('feedback.service', [])
    .factory('FeedbackFty', ['$http', function($http) {
        return{
            // 提交意见数据
            feedbackService: function () {
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