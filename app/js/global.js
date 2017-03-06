angular.module('global', [])
    .constant('API', 'http://123.207.114.250:10080/rest') // deploy

    .constant('GlobalVariable', {
        // 服务器地址
        SERVER_PATH: 'http://112.74.26.228:10080/rest',
        ACCESS_TOKEN: 'eyJ0b2tlbiI6ImE3NGE1YzQ0ZDg0NzM5NDJiYmIyMWYzNDJlMTU4Y2MxNWJiOTZlNTMiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9',
        SELLER_SHIP: 'YES',
        FOLLOW_US_URL: 'http://www.kequandian.net',
        CAN_APPLY_CROWN: true
    })
    .value('LoginSession', {
        token: 'token'
    })
;
