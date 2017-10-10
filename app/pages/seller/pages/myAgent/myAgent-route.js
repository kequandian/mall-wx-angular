angular.module('myAgent.route', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('myAgent', {
            url:'/myAgent',
            templateUrl: 'pages/seller/pages/myAgent/myAgent.html',
            controller:'MyAgentController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('MyAgent');
                }]
            }
        })

        /*
         * 申请经销商须知
         * */
        .state('commissionPage', {
            url:'/commissionPage',
            templateUrl: 'pages/seller/pages/myAgent/pages/commissionPage.html',
            controller:'CommissionPageController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('CommissionPage');
                }]
            }
        })

        /*
         * 年终奖励对照表
         * */
        .state('commissionPageLookupTable', {
            url:'/commissionPageLookupTable/:pcdId',
            templateUrl: 'pages/seller/pages/myAgent/pages/commissionPageLookupTable.html',
            controller:'CommissionLookupTableController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('CommissionPageLookupTable');
                }]
            }
        })

        /*
         * 明细
         * */
        .state('commissionPageCheckTable', {
            url:'/commissionPageCheckTable',
            templateUrl: 'pages/seller/pages/myAgent/pages/commissionPageCheckTableData.html',
            controller:'CommissionCheckTableController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('CommissionCheckTable');
                }]
            },
        })

        /*
         *
         * */
        .state('comPageSettlementRecord', {
            url:'/comPageSettlementRecord',
            templateUrl: 'pages/seller/pages/myAgent/pages/commissionPageSettlementRecord.html',
            controller:'ComPageSettlementRecordController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('ComPageSettlementRecord');
                }]
            }
        })
    }]);