angular.module('global', [])
    .constant('API', 'http://123.207.114.250:10080/rest') // deploy

    .constant('GlobalVariable', {
        // 服务器地址
        SERVER_PATH: 'http://112.74.26.228:10080/rest',
        //ACCESS_TOKEN: 'eyJsb2dpbl9uYW1lIjoiamluZ2ZlaSIsInRva2VuIjoiNWFlOWU5ZGQ0Yzk0YzQwNzU4NzA1ZmI3ZDc1NTdjY2QxYzAzM2ZlYiJ9',
        ACCESS_TOKEN: 'eyJsb2dpbl9uYW1lIjoiYWJjIiwidG9rZW4iOiIwMDJmMzNkYTQxYmIwYWIzZjVkNjZkNTVkNzcxNzNlNWE1MDhiYmVkIn0=',
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
