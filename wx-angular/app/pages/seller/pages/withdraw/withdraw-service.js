/**
 * Created by jimmie on 2016/6/7.
 */

angular.module('withdraw.service', [])
    .factory('withdrawFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
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


            // 获取历史列表
            getHistoryService: function() {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/reward_cash";
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
            },

            // 获取提现记录
            getExchangeRecordService: function (startTime,endTime) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/reward_cash?start_date=" + startTime + "&end_date=" + endTime;
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