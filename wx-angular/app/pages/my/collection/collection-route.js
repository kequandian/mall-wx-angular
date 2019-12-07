angular.module('collection.route', [/*'collection.controller'*/])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('collection', {
                url:'/collection',
                templateUrl: 'pages/my/collection/collection.html',
                controller:'CollectionController',
                resolve: {
                    loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('Collection');
                    }]
                }
            });
    }]);