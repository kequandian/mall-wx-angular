angular.module('global', [])
    .constant('API', 'http://123.207.114.250:10080/rest') // deploy

    .constant('GlobalVariable', {
        // 服务器地址
        SERVER_PATH: 'http://112.74.26.228:10080/rest',
        ACCESS_TOKEN: 'eyJsb2dpbl9uYW1lIjoidXNlcjEyMyIsInRva2VuIjoiYTc3ZTc4ZGE5Y2QwYWIwN2Y5ZmZhMmZhYTFmYjM2MDMxOTljYjA0MiJ9',
        //ACCESS_TOKEN: 'eyJsb2dpbl9uYW1lIjoib1hhdU13Y01xR2VWNnpkSEdMXzFDY21qbFFVZyIsInRva2VuIjoiYWJjZmZjMTc3ZTIxODg5YmJlYmY2NGVjM2NhM2M1NjZmOTY0YjU1OCJ9',
        SELLER_SHIP: 'YES',
        FOLLOW_US_URL: 'http://www.kequandian.net',
        CAN_APPLY_CROWN: true,
        APPLY_PHYSICAL_CROWN_TEXT:'',
        APPLY_PHYSICAL_SELLER_TEXT:'',
        SHOW_PRODUCT_CATEGORY_MENU:true,
    })
    .value('LoginSession', {
        token: 'token'
    })
;
