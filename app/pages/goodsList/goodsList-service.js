angular.module('goodsList.service', [])
    .factory('GoodsListFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取商品类别列表数据 &orderByDesc=view_count&orderBy=price&orderBy=sales
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

            //加入购物车
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

            //搜索----商品列表
            //商品搜索&orderByDesc=view_count&orderBy=price&orderBy=sales
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


            //分区----商品列表
            //商品搜索&orderByDesc=view_count&orderBy=price&orderBy=sales
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

            //首页推荐商品
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