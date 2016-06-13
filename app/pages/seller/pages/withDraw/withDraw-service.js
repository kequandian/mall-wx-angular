/**
 * Created by jimmie on 2016/6/7.
 */

angular.module('withDraw.service', [])
    .factory('withDrawMon', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{

            // 获取账户信息
            myAccountService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/withdraw_account";
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


            // 提交提现金额
            postDrawService: function (withdraw_account_id,withdraw_cash) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/owner_balance";
                $http.post(url,{
                    "withdraw_account_id": withdraw_account_id,
                    "withdraw_cash":       withdraw_cash,

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
            }
        }
    }]);