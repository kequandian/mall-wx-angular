angular.module('businessQRCode.route', [/*'addressManager.controller'*/])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('businessQRCode', {
            url: '/businessQRCode',
            templateUrl: 'pages/my/businessQRCode/businessQRCode.html',
            controller: 'BusinessQRCodeController'
            ,resolve: {
                loadGoodsList: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('BusinessQRCode');
                }]
            }
        })

    }]);