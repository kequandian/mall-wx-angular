angular.module('global', [])
    .constant('API', 'http://123.207.114.250:10080/rest') // deploy

    .constant('GlobalVariable', {
        // 服务器地址
        SERVER_PATH: 'http://112.74.26.228:10080/rest',
        ACCESS_TOKEN: 'eyJsb2dpbl9uYW1lIjoidXNlcjEyMyIsInRva2VuIjoiNWJmMGIzNzZjNDk3NmE0ZTdjZDFlODExYjNkZTk2YjhkY2I5YjlhNiJ9',
        SELLER_SHIP: 'YES',
        FOLLOW_US_URL: 'http://www.kequandian.net',
        CAN_APPLY_CROWN: true,
        APPLY_PHYSICAL_CROWN_TEXT:'',
        APPLY_PHYSICAL_SELLER_TEXT:''
    })
    .value('LoginSession', {
        token: 'token'
    })
;
