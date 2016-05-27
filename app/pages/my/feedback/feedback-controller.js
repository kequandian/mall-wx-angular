angular.module('feedback.controller', ['feedback.service'])

    .controller('FeedbackController', ['$scope', '$state', 'FeedbackFty', function($scope, FeedbackFty){

        //title
        document.title = "意见反馈";


    }]);