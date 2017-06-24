angular.module('sellerTeam.service', [])
    .factory('SellerTeamFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 获取线下团队
            getOffLineSellerTeamsService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/physical_seller";
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

            // 获取个人信息数据
            myInfoService: function () {
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
            },

            // 成为线下代理
            applyService: function (real_name,phone,sellerType) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/seller";
                $http.post(url,{
                    real_name:real_name,
                    phone:phone,
                    type:sellerType
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

            // 授权
            authorizeService: function (uid,real_name,phone) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/physical_seller";
                $http.post(url,{
                    uid:uid,
                    real_name:real_name,
                    phone:phone
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

            // 查看线下推荐进货明细
            getPurchaseSummaryService: function (select_date) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/physical_purchase_summary?month=" + select_date;
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

            // 提交提现申请
            postWidthApplyService: function (accountInfo) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/physical_withdraw";
                $http.post(url,{
                    bank_name:accountInfo.bank_name,
                    account_name:accountInfo.account_name,
                    account_number:accountInfo.account_number,
                    amount:accountInfo.amount
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
                var url = GlobalVariable.SERVER_PATH + "/physical_withdraw?status=APPLYING&start_date=" + startTime + "&end_date=" + endTime;
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

            // 获取提现记录
            getSettlementRecordService: function (startTime,endTime) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/physical_purchase_summary";
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

            // 获取经销商进货明细
            getPurchaseJournalService: function (id) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/physical_purchase_journal/" + id;
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

            // 获取比例对照表
            getPhysicalProportionService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/physical_proportion";
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

            // 推荐皇冠，星级经销商授权
            recommendCrownSellerService: function (apply_code) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/physical_seller";
                $http.post(url,apply_code,{
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

            // 查看申请须知
            getApplyNoticeService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/physical_crown_tips";
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

            // 获取分销级别数据
            ownerBalanceService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/owner_balance";
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