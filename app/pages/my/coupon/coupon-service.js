angular.module('coupon.service', [])
    .factory('CouponFty', ['$http', '$q','GlobalVariable', function($http, $q,GlobalVariable) {
        return {
            // 获取商品类别数据
            couponsService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/order";
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
        };
    }]);