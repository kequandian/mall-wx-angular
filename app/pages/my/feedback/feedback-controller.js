angular.module('feedback.controller', ['feedback.service'])

    .controller('FeedbackController', ['$scope', '$state', 'FeedbackFty', function ($scope, $state, FeedbackFty) {

        //title
        document.title = "意见反馈";
        $scope.postQuestion = function () {

            var content = $scope.q_content;

            if (!angular.isString(content) || content.length == 0) {
                $.toast('请输入意见', 'cancel');
                return;
            }

            FeedbackFty.feedbackService(content)
                .then(function (json) {
                    //alert(angular.toJson(json));
                    if (json.status_code == 0) {
                        $scope.q_content = null;
                        $.toast('提交成功');
                    } else {
                        $.toast('提交失败', 'cancel');
                    }
                }, function (error) {
                    $.toast('提交失败', 'cancel');
                })
        }

        $scope.uploadImage = function(){
            //console.log('uploadImage');
            loadImageFileAsURL();
        }

        function loadImageFileAsURL() {
            var filesSelected = document.getElementById("inputFileToLoad").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.onload = function (fileLoadedEvent) {
                    var encodedResult = fileLoadedEvent.target.result;
                    //console.log(encodedResult);
                };

                fileReader.readAsDataURL(fileToLoad);
            }
        }

    }]);