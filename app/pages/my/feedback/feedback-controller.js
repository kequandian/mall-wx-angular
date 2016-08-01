angular.module('feedback.controller', ['feedback.service'])

    .controller('FeedbackController', ['$scope', '$state', '$timeout', 'FeedbackFty', 'ImageUpLoad',
        '$ocLazyLoad', function ($scope, $state, $timeout, FeedbackFty, ImageUpLoad, $ocLazyLoad) {

            //title
            document.title = "意见反馈";
            $scope.image_list = [];

            var timestamp, end_timestamp;

            $scope.onTouchStart = function(url) {
                console.log('----------touchstart event called----------');
                timestamp = new Date().getTime();
                console.log('timestamp?'+end_timestamp);

                $timeout(function(){

                    if( end_timestamp==null ) {
                        deleteImage(url);
                    }else if((timestamp - end_timestamp)<1800){
                        // do nothing
                        //console.log('do nothing:timestamp='+ timestamp + ';end_timestamp=' + end_timestamp+ '; ' + (timestamp - end_timestamp));

                    }else if(timestamp > end_timestamp){
                        deleteImage(url);
                    }

                    end_timestamp = new Date().getTime();
                }, 2000);
            }

            function deleteImage(url){
                var index = $scope.image_list.indexOf(url);
                $scope.image_list.splice(index);
            }

            $scope.onTouchEnd = function(url) {
                // current time, means end
                console.log('touchend event called');
                end_timestamp = new Date().getTime();
                console.log('end_timestamp?'+end_timestamp);
            }


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
                            $.toast.prototype.defaults = 800;
                            $.toast('提交成功');
                            $timeout(function () {
                                $state.go('home.my');
                            }, 900);
                        } else {
                            $.toast('提交失败', 'cancel');
                        }

                    }, function (error) {
                        $.toast('提交失败', 'cancel');
                    })
            };

            $scope.uploadImage = function () {
                if ($scope.image_list.length >= 5) {
                    $.toast('提交图片不能超过5张', 'cancel');
                } else {
                    $ocLazyLoad.load('lib/utils/compressImg.js').then(function () {
                        loadImageFileAsURL(ImageUpLoad);
                    })
                }
            };

            function loadImageFileAsURL(ImageUpLoad) {
                var filesSelected = document.getElementById("inputFileToLoad").files;
                if (filesSelected.length > 0) {

                    if (($scope.image_list.length + filesSelected.length) > 5) {
                        $.toast('提交图片不能超过5张', 'cancel');
                    } else {

                        var success = 0;
                        for (var i = 0; i < filesSelected.length; i++) {
                            var fileToLoad = filesSelected[i];
                            var fileType = fileToLoad.type;

                            var fileReader = new FileReader();

                            fileReader.onload = function (fileLoadedEvent) {
                                var prevImage = new Image();

                                prevImage.onload = function () {
                                    if (fileType == 'image/png') {
                                        if (prevImage.width > 256 || prevImage.height > 256) {
                                            var canvas = document.createElement('canvas'),
                                                ctx = canvas.getContext('2d');

                                            fileType = 'image/jpeg'
                                            ctx.drawImage(prevImage, 0, 0);

                                            var dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                                            prevImage.src = dataUrl;
                                            //console.log(prevImage.src);
                                        }
                                    }

                                    var compressedImage = compressImg.compress(prevImage, fileType, 90);

                                    ImageUpLoad.uploadImage(compressedImage.src).then(function (json) {
                                        //console.log(json);
                                        if (json.status_code == 0) {

                                            if (!angular.isDefined($scope.image_list)) {
                                                $scope.image_list = [];
                                            }

                                            //console.log(json.data);
                                            $scope.image_list.push(json.data);
                                            console.log(angular.toJson($scope.image_list));

                                            //$.toast('提交成功');
                                            success++;

                                        } else {
                                            //$.toast('提交失败', 'cancel');
                                        }
                                    }, function (error) {
                                        //$.toast('提交失败', 'cancel');
                                    })
                                    //console.log('image/jpeg?'+data);
                                };

                                prevImage.src = fileLoadedEvent.target.result;
                                //console.log('image/base64?'+prevImage.src);

                            };

                            fileReader.readAsDataURL(fileToLoad);
                        }//for

                        //if(success>0){
                        //    $.toast('提交成功');
                        //}
                    }

                }//length
            }

            //TODO: move to utils
            /*var compressImg = {
             /!**
             * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
             * @param {Image} sourceImg The source Image Object
             * @param {String} mimeType
             * @param {Integer} quality The output quality of Image Object
             * @return {Image} resultImg The compressed Image Object
             *!/
             compress: function(sourceImg, mimeType, quality) {
             var maxWidth = 1024;
             var maxHeight = 1024;
             if (sourceImg.width > maxWidth || sourceImg.height > maxHeight) {
             var cvs = document.createElement('canvas');
             cvs.width = sourceImg.width;
             cvs.height = sourceImg.height;
             if (sourceImg.width > maxWidth) {
             cvs.width = maxWidth;
             cvs.height *= maxWidth / sourceImg.width;
             }
             else if (sourceImg.height > maxHeight) {
             cvs.height = maxHeight;
             cvs.width *= maxHeight / sourceImg.height;
             }
             var xRate = cvs.width / sourceImg.naturalWidth;
             var yRate = cvs.height / sourceImg.naturalHeight;
             //naturalWidth真实图片的宽度
             var cvsContext = cvs.getContext('2d');
             cvsContext.scale(xRate, yRate);
             var ctx = cvsContext.drawImage(sourceImg, 0, 0);
             var newImageData = cvs.toDataURL(mimeType, quality/100);
             var resultImg = new Image();
             resultImg.src = newImageData;
             return resultImg;
             }
             else {
             return sourceImg;
             }
             }

             };*/

        }]);