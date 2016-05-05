angular.module('shopSettings.route', ['shopSettings.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('shopSettings', {
            url:'/shopSettings',
            templateUrl: 'pages/seller/pages/shopSettings/shopSettings.html',
            controller:'ShopSettingsController'
        })
    }]);