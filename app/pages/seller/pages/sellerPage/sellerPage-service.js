angular.module('sellerPage.service', [])
    .factory('SellerPageFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取分销个人信息数据
            sellerUserInfoService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/profile";
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
            ownerBalanceService: function () {
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

            //成为分销商
            becomeDistribution: function (real_name,phone) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/seller";
                $http.post(url,{
                    "real_name": real_name,
                    "phone":phone
                },{
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

            // 获取商品批发类别
            getWholesaleService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/wholesale_category";
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