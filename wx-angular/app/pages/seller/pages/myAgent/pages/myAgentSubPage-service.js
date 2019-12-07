angular.module('myAgentSubPage.service', [])
    .factory('MyAgentSubPageFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{

            //关注公众号URL
            getFollowUsUrl:function(){
                return GlobalVariable.FOLLOW_US_URL;
            },

            //申请皇冠提示
            getCrownTips: function(){
                return GlobalVariable.APPLY_PHYSICAL_CROWN_TEXT
            },
            //申请星级提示
            getStarTips: function(){
                return GlobalVariable.APPLY_PHYSICAL_SELLER_TEXT
            },

            // 查看线下推荐进货明细
            getPurchaseSummaryService: function (select_date) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/agent_summary?month=" + select_date;
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
            getPhysicalProportionService: function (id) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/physical_agent_bonus?pcd_id=" + id;
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

            // 获取结算明细
            getSettlementRecordService: function (startTime,endTime) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/agent_summary";
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