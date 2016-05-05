angular.module('homePage.service', [])
    .factory('HomePageFty', ['$http', '$q', function($http,$q) {
        return{
            // ��ȡ������������
            journalService: function () {
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