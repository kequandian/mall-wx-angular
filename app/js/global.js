angular.module('global', [])
    .constant('API', 'http://112.74.26.228:10080/rest')

    .constant('GlobalVariable', {
        // 服务器地址
        SERVER_PATH: 'http://112.74.26.228:10080/rest',
        ACCESS_TOKEN: 'eyJ0b2tlbiI6ImI2OTc4NDc3OWE0MmI4MGRiY2ExN2VjNWQxZTFhYjllNThiOWE2MzgiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9',
        IS_SELLER: false
    })
    .value('LoginSession', {
        token: 'token'
    })
;
