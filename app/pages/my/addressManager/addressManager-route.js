angular.module('addressManager.route', ['addressManager.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('addressManager', {
            url: '/addressManager',
            templateUrl: 'pages/my/addressManager/addressManager.html',
            controller:'AddressManagerController'
        })
    }]);