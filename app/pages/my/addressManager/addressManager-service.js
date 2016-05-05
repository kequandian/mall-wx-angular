angular.module('addressManager.service', [])
    .factory('AddressManagerFty', ['$http', '$q','GlobalVariable', function($http,$q,GlobalVariable) {
        return{
            // ��ȡ��Ʒ�������
            addressListService: function () {
                var deferred = $q.defer();
                var url = GlobalVariable.SERVER_PATH + "/contact";
                $http.get(url,{
                    headers: {
                        'Authorization': 'eyJ0b2tlbiI6ImZjOWYzZjFmOWQ3MWFjYmU5YmJkMjUxNzIxMzY1MTU5Nzc0NzYyOTMiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9'
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