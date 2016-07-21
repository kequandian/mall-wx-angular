angular.module('global', [])
    .constant('API', 'http://112.74.26.228:10080/rest')

    .constant('GlobalVariable', {
        // 服务器地址
        SERVER_PATH: 'http://112.74.26.228:10080/rest',
        ACCESS_TOKEN: 'eyJ0b2tlbiI6IjIwN2JjOTVjNGZiMDU5YTQ2ZDQzZjIyZGRiZGM0YTIzNDQ5ZTY4OTkiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9',
        SELLER_SHIP: 'EEEE'
    })
    .value('LoginSession', {
        token: 'token'
    })
;
