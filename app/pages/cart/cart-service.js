angular.module('cart.service', [])
    .factory('CartFty', ['$http','$q', 'GlobalVariable', function($http, $q, GlobalVariable) {
        return {
            getCarts: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/shopping_cart?with_stock_balance=true';
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

            deleteCart: function (cartItem) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/shopping_cart';
                $http({
                    method: 'POST',
                    url: url,
                    data: [{
                        product_id: cartItem.product_id,
                        quantity: 0,
                        product_specification_id:cartItem.product_specification_id
                    }],
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

            //�����ջ���ַ
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

            //��ȡʡ����
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

            //�޸���Ʒ����
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
            },

            //��ȡ�˷�
            frieghtService: function (fare_item) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_carriage";
                $http.post(url,fare_item,{
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

            //�µ�ǰ�����Żݾ���Ϣ
            countCouponService: function (products) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/coupon_calculation";
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
            },

            //��ȡ��Ʒ�������͵�
            getWholesalePCDService: function () {
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
        };
    }]);