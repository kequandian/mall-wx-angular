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
                        'Authorization': GlobalVariable.ACCESS_TOKEN
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
                        'Authorization': GlobalVariable.ACCESS_TOKEN
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
                        'Authorization': GlobalVariable.ACCESS_TOKEN
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

            deleteProduct: function (data) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/shopping_cart';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
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
                var url = GlobalVariable.WPAY_URL + '/'+ order_number;
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
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

            //新增收货地址
            addContact: function (data) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/contact';
                $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
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

            //获取省市区
            getPCDService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/pcd?all=true';
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': GlobalVariable.ACCESS_TOKEN
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

            //修改商品数量
            editCountService: function (products) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/shopping_cart?increase=false";
                $http.post(url,products,{
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