angular.module('global', [])
    .constant('API', 'http://123.207.114.250:10080/rest') // deploy

    .constant('GlobalVariable', {
        // 服务器地址
        SERVER_PATH: 'http://112.74.26.228:10080/rest',
        ACCESS_TOKEN: 'eyJ0b2tlbiI6IjE3MmFmZjYwNzU2OTBlNTE0ZTZlZjJjNTc2NDZhMWE0YzhhZjcxYzQiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9',
        SELLER_SHIP: 'YES',
        FOLLOW_US_URL: 'http://www.kequandian.net'
    })
    .value('LoginSession', {
        token: 'token'
    })
;
