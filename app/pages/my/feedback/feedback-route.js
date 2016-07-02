angular.module('feedback.route', [/*'feedback.controller'*/])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('feedback', {
                url:'/feedback',
                templateUrl: 'pages/my/feedback/feedback.html',
                controller:'FeedbackController',
                resolve: {
                    loadData: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('Feedback');
                    }]
                }
            });
    }]);