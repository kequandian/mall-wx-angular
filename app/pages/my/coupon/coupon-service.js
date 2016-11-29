angular.module('coupon.service', [])
    .factory('CouponFty', ['$http', '$q','GlobalVariable', function($http, $q,GlobalVariable) {
        return {
            // ��ȡ��Ʒ�������
            couponsService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/coupon";
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
            },

            // ��ȡ��Ʒ�������
            activationService: function (id) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/coupon/" + id;
                $http.put(url,{
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
        };
    }]);