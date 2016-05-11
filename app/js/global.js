// Ionic项目中的全局级配置
angular.module('global', [])
  .constant('API', 'http://112.74.26.228:10080/rest')

  .constant('GlobalVariable', {
    // 服务器地址
    SERVER_PATH: 'http://112.74.26.228:10080/rest'
  })


  .value('LoginSession', {
      token: 'token'
  })

;
