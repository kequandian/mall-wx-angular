angular.module('details.service', [])
    .factory('DetailsFty', ['$http', '$q', 'GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            detailsService: function (productId) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product/" + productId;
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

            //ÉÌÆ··µÀû
            productRebateService:function(productId){

                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_settlement?id=" + productId;

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

            addProToCatService: function (productId,quantity,properties,specification_id) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/shopping_cart";
                $http.post(url,[{
                    "product_id": productId,
                    "quantity": quantity,
                    "product_specification_id": specification_id
                }],{
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

            addCollectionService: function (productId) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_favorite";
                $http.post(url,{
                    "product_id": productId
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

            expressSerivce: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/default_express";
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

            kqQQService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/kf_qq";
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

            check_buy_count: function (productId, quantity) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_purchase_strategy?productId="+productId+"&quantity="+quantity;
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
            }
        }
    }]);
