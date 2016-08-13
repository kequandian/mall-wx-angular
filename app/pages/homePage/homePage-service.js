angular.module('homePage.service', [])
    .factory('HomePageFty', ['$http', '$q','GlobalVariable',
        function($http,$q,GlobalVariable) {
            return{
                recommendProductService: function (pageNumber, pageSize) {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/product?pageNumber=" + pageNumber + "&pageSize=" + pageSize;
                    $http.get(url)
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                getAdService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/ad/home";
                    $http.get(url)
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                getAdBanner: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/ad/banner";
                    $http.get(url)
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                getFollowusUrl: function() {
                    return GlobalVariable.FOLLOW_US_URL;
                }
            }
    }])
;