angular.module('feedback.service', [])
    .factory('FeedbackFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // 提交意见数据
            feedbackService: function (content, image_list) {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/feedback";
                $http.post(url,{
                    "content": content,
                    "images": image_list
                },{
                    headers:{
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            },

            uploadImage: function(data){
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/upload_image";
                $http.post(url,data,{
                    headers:{
                        'Authorization': GlobalVariable.ACCESS_TOKEN
                    }
                })
                    .success(function (data) {
                        return deferred.resolve(data);
                    }).error(function (data) {
                        return deferred.reject(data);
                    });
                return deferred.promise;
            }
        }
    }]);