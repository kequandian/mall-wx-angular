angular.module('goodsList.service', [])
    .factory('GoodsListFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // ��ȡ��Ʒ����б����� &orderByDesc=view_count&orderBy=price&orderBy=sales
            goodsListService: function (cateId,pageNumber,pageSize,orderBy) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_category/" + cateId + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize + orderBy;
                $http.get(url)
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            },

            //���빺�ﳵ
            addProToCatService: function (productId) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/shopping_cart";
                $http.post(url,[{
                    "product_id": productId,
                    "quantity": 1
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

            //����----��Ʒ�б�
            //��Ʒ����&orderByDesc=view_count&orderBy=price&orderBy=sales
            sGoodsProductService: function (productName,pageNumber,pageSize,orderBy) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_search?pageNumber=" + pageNumber + "&pageSize= " + pageSize + " &name=" + productName + orderBy;
                $http.get(url)
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            },


            //����----��Ʒ�б�
            //��Ʒ����&orderByDesc=view_count&orderBy=price&orderBy=sales
            areasProductService: function (zone,pageNumber,pageSize,orderBy) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product?pageNumber=" + pageNumber + "&pageSize= " + pageSize + " &zone=" + zone + orderBy;
                $http.get(url)
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            },

            //��ҳ�Ƽ���Ʒ
            recommendProductService: function (pageNumber,pageSize,orderBy,cateId,promoted) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/product_category/" + cateId + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize + orderBy + promoted;
                $http.get(url)
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            }
        }
    }]);