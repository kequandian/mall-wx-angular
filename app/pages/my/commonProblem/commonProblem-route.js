angular.module('commonProblem.route', [/*'commonProblem.controller'*/])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('commonProblem', {
                url:'/commonProblem',
                templateUrl: 'pages/my/commonProblem/commonProblem.html',
                controller:'CommonProblemController',
                resolve: {
                    loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('Questions');
                    }]
                }
            })

            /*售后政策*/
            .state('serviceProblemPage', {
                url:'/serviceProblemPage',
                templateUrl: 'pages/my/commonProblem/pages/serviceProblemPage.html',
                controller:'ServiceProblemPageController',
                resolve: {
                    loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('Questions');
                    }]
                }
            })

            /*常见问题*/
            .state('commProblemPage', {
                url:'/commProblemPage',
                templateUrl: 'pages/my/commonProblem/pages/commProblemPage.html',
                controller:'CommProblemPageController',
                resolve: {
                    loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('Questions');
                    }]
                }
            })

            /*商品配送*/
            .state('distributionProblemPage', {
                url:'/distributionProblemPage',
                templateUrl: 'pages/my/commonProblem/pages/distributionProblemPage.html',
                controller:'DistributionProblemPageController',
                resolve: {
                    loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('Questions');
                    }]
                }
            })
        ;
    }]);