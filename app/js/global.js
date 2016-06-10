angular.module('global', [])
    .constant('API', 'http://112.74.26.228:10080/rest')

    .constant('GlobalVariable', {
        // 服务器地址
        SERVER_PATH: 'http://112.74.26.228:10080/rest',
        ACCESS_TOKEN: 'eyJ0b2tlbiI6ImZjOWYzZjFmOWQ3MWFjYmU5YmJkMjUxNzIxMzY1MTU5Nzc0NzYyOTMiLCJsb2dpbl9uYW1lIjoiamluZ2ZlaSJ9'
    })

    .value('LoginSession', {
        token: 'token'
    })

    .value('ProfileSession', {
        is_seller:0,
        is_agent:0,
        is_partner:0
    })

    .filter('NotNull', function(){
        return function(input){
            if(!angular.isDefined(input)){
                return 0;
            }

            if(input==null){
                return 0;
            }

            return input;
        }
    })

;
