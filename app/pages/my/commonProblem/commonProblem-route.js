angular.module('commonProblem.route', ['commonProblem.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('commonProblem', {
                url:'/commonProblem',
                templateUrl: 'pages/my/commonProblem/commonProblem.html',
                controller:'CommonProblemController'
            })

            /*售后政策*/
            .state('serviceProblemPage', {
                url:'/serviceProblemPage',
                templateUrl: 'pages/my/commonProblem/pages/serviceProblemPage.html',
                controller:'ServiceProblemPageController'
            })

            /*常见问题*/
            .state('commProblemPage', {
                url:'/commProblemPage',
                templateUrl: 'pages/my/commonProblem/pages/commProblemPage.html',
                controller:'CommProblemPageController'
            })

            /*商品配送*/
            .state('distributionProblemPage', {
                url:'/distributionProblemPage',
                templateUrl: 'pages/my/commonProblem/pages/distributionProblemPage.html',
                controller:'DistributionProblemPageController'
            })
        ;
    }]);