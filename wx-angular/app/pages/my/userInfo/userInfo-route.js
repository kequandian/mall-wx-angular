angular.module('userInfo.route', ['userInfo.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('userInfo', {
            url:  '/userInfo',
            templateUrl: 'pages/my/userInfo/userInfo.html',
            controller:'UserInfoController'
        })
    }]);