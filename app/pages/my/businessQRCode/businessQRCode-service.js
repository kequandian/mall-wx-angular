angular.module('businessQRCode.service', [])
    .factory('BusinessQRCodeFty', ['$http','$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return {
            // ��ȡ�̼Ҹ�����Ϣ����
            businessUserInfoService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/merchant/profile";
                $http.get(url,{
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
        };
    }]);