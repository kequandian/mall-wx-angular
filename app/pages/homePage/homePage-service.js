angular.module('homePage.service', [])
    .factory('HomePageFty', ['$http', '$q','GlobalVariable',
        function($http,$q,GlobalVariable) {
            return{
                recommendProductService: function (pageNumber, pageSize) {
                    var deferred = $q.defer();
                    //var url = GlobalVariable.SERVER_PATH + "/product?pageNumber=" + pageNumber + "&pageSize=" + pageSize;
                    var url = GlobalVariable.SERVER_PATH + "/product_category?promoted=true";
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
                },

                // 获取分销余额数据
                getBalanceService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/owner_balance";
                    $http.get(url,{
                        headers:{
                            'Authorization': GlobalVariable.ACCESS_TOKEN
                        }
                    })
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                // 获取分销余额数据
                getSystemAnnouncementService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/system_announcement";
                    $http.get(url,{
                        headers:{
                            'Authorization': GlobalVariable.ACCESS_TOKEN
                        }
                    })
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                // 检查该用户是否有未激活的优惠卷
                getCouponNotifyService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/coupon_notify";
                    $http.get(url,{
                        headers:{
                            'Authorization': GlobalVariable.ACCESS_TOKEN
                        }
                    })
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                // 获取拼团信息
                getHomeFightGroupsService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/piece_group_purchase?pageNumber=1&pageSize=10";
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
    }])
;