angular.module('addressManager.route', [/*'addressManager.controller'*/])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('addressManager', {
            url: '/addressManager',
            templateUrl: 'pages/my/addressManager/addressManager.html',
            controller: 'AddressManagerController'
            ,resolve: {
                loadGoodsList: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Address');
                }]
            }
        })
        .state('add-address', {
            url: '/addAddress',
            templateUrl: 'pages/my/addressManager/add/addAddress.html',
            controller: 'AddressManagerController'
            ,resolve: {
                loadGoodsList: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Address');
                }]
            }
        })
        .state('edit-address', {
            url: '/editAddress',
            templateUrl: 'pages/my/addressManager/edit/editAddress.html',
            controller: 'AddressManagerController',
            params: {
                'data': null
            }
            ,resolve: {
                loadGoodsList: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('Address');
                }]
            }
        })

    }]);