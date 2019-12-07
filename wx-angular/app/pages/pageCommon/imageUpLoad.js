angular.module("imageUpLoad.service", [])
    .factory("ImageUpLoad", ["$http", "$q", "GlobalVariable", function ($http, $q, GlobalVariable) {
        return {
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