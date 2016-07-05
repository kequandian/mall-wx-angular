angular.module('feedback.controller', ['feedback.service'])

    .controller('FeedbackController', ['$scope', '$state', 'FeedbackFty','ImageUpLoad',
        function ($scope, $state, FeedbackFty,ImageUpLoad) {

        //title
        document.title = "意见反馈";

        $scope.postQuestion = function () {

            var content = $scope.q_content;

            if (!angular.isString(content) || content.length == 0) {
                $.toast('请输入意见', 'cancel');
                return;
            }

            FeedbackFty.feedbackService(content, $scope.image_list)
                .then(function (json) {
                    //alert(angular.toJson(json));
                    if (json.status_code == 0) {
                        // reset
                        $scope.q_content = undefined;
                        $scope.image_list = undefined;

                        $.toast('提交成功');
                    } else {
                        $.toast('提交失败', 'cancel');
                    }

                }, function (error) {
                    $.toast('提交失败', 'cancel');
                })
        }

        $scope.uploadImage = function(){
            loadImageFileAsURL(ImageUpLoad);
        }

        function loadImageFileAsURL(ImageUpLoad) {
            var filesSelected = document.getElementById("inputFileToLoad").files;
            if (filesSelected.length > 0) {

                var success = 0;
                for (var i = 0; i < filesSelected.length; i++) {
                    var fileToLoad = filesSelected[i];

                    var fileReader = new FileReader();

                    fileReader.onload = function (fileLoadedEvent) {
                        var encodedResult = fileLoadedEvent.target.result;
                        //console.log(encodedResult);

                        ImageUpLoad.uploadImage(encodedResult).then(function (json) {
                            console.log(json);
                            if (json.status_code == 0) {

                                if(!angular.isDefined($scope.image_list)) {
                                    $scope.image_list = [];
                                }

                                //console.log(json.data);
                                $scope.image_list.push(json.data);

                                //$.toast('提交成功');
                                success ++;

                            } else {
                                //$.toast('提交失败', 'cancel');
                            }
                        }, function (error) {
                            //$.toast('提交失败', 'cancel');
                        })
                    };

                    fileReader.readAsDataURL(fileToLoad);
                }//for

                //if(success>0){
                //    $.toast('提交成功');
                //}

            }//length
        }

    }]);