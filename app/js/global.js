angular.module('global', [])
    .constant('API', 'http://112.74.26.228:10080/rest')

    .constant('GlobalVariable', {
        // 服务器地址
        SERVER_PATH: 'http://112.74.26.228:10080/rest',
        ACCESS_TOKEN: 'eyJ0b2tlbiI6ImU4Y2E2ODQ0OWY1M2JmZWFiZDFkMWEyMjhkMjI3YTBmNzNjN2UxN2EiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9'
    })

    .value('LoginSession', {
        token: 'token'
    })
;
