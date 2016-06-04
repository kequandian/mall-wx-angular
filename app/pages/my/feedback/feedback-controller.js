angular.module('feedback.controller', ['feedback.service'])

    .controller('FeedbackController', ['$scope', '$state', 'FeedbackFty', function($scope,$state, FeedbackFty){

        //title
        document.title = "意见反馈";
        $scope.postQuestion = function (){

            var content = $scope.q_content;

            FeedbackFty.feedbackService(content)
                .then(function(json){
                    alert(angular.toJson(json));
                    if(json.status_code == 0){

                        $.toast('提交成功');
                    }else{
                        $.toast('提交失败', 'cancel');
                    }
                }, function(error){
                    $.toast('提交失败', 'cancel');
                })
        }

    }]);