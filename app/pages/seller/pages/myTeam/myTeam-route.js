angular.module('myTeam.route', [/*'myTeam.controller'*/])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('myTeam', {
            url:'/myTeam',
            templateUrl: 'pages/seller/pages/myTeam/myTeam.html',
            controller:'MyTeamController',
            resolve: {
                loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Team');
                }]
            }
        })
}]);