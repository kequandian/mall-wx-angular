angular.module('feedback.route', ['feedback.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('feedback', {
                url:'/feedback',
                templateUrl: 'pages/my/feedback/feedback.html',
                controller:'FeedbackController'
            });
    }]);