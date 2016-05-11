angular.module('cart.service', [])
    .factory('CartFty', ['$http','$q', 'GlobalVariable', function($http, $q, GlobalVariable) {
        return {
            getCarts: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/shopping_cart';
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': 'eyJ0b2tlbiI6ImZjOWYzZjFmOWQ3MWFjYmU5YmJkMjUxNzIxMzY1MTU5Nzc0NzYyOTMiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9'
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            deleteCart: function (id) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/shopping_cart';
                $http({
                    method: 'POST',
                    url: url,
                    data: [{product_id: id, quantity: 0}],
                    headers: {
                        'Authorization': 'eyJ0b2tlbiI6ImZjOWYzZjFmOWQ3MWFjYmU5YmJkMjUxNzIxMzY1MTU5Nzc0NzYyOTMiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9'
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            addOrder: function (data) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/order';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {
                        'Authorization': 'eyJ0b2tlbiI6ImZjOWYzZjFmOWQ3MWFjYmU5YmJkMjUxNzIxMzY1MTU5Nzc0NzYyOTMiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9'
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            },

            wpay: function (order_number) {
                var deferred = $q.defer();
                var url = 'http://www.kequandian.net/payment/wpay/'+ order_number;
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': 'eyJ0b2tlbiI6ImZjOWYzZjFmOWQ3MWFjYmU5YmJkMjUxNzIxMzY1MTU5Nzc0NzYyOTMiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9'
                    }
                })
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            }
        };
    }]);