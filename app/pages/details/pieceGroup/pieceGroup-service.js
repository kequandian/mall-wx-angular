angular.module('pieceGroup.service', [])
    .factory('PieceGroupFty', ['$http', '$q', 'GlobalVariable', function($http,$q,GlobalVariable) {
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

            //��Ʒ����
            productRebateService:function(productId,marketingType,marketingId){

                var deferred = $q.defer();
                var url = null;

                if(marketingType != null && marketingId != null){
                    url = GlobalVariable.SERVER_PATH + "/product_settlement?id=" + productId + "&marketingType=" + marketingType + "&marketingId=" + marketingId;
                }else{
                    url = GlobalVariable.SERVER_PATH + "/product_settlement?id=" + productId;
                }

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
            },

            //��ȡƴ����Ʒ����
            getFightGroupsDetailsService: function (id) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/piece_group_purchase/" + id;
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

            //��ȡ�ջ���ַ
            getContactsService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + '/contact';
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

            // ��ȡ����������Ϣ����
            detailsUserInfoService: function () {
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
            }
        }
    }]);
