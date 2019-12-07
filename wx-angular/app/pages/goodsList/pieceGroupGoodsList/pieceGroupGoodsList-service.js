angular.module('pieceGroupGoodsList.service', [])
    .factory('PieceGroupGoodsListFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // ��ȡ�ⵥ��Ʒ�б�����
            pieceGroupGoodsListService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/piece_group_purchase?masterFree=1";
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