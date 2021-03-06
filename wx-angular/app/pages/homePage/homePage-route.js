angular.module('homePage.route', ['homePage.controller', 'bsSwitch', 'spinner'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home.homePage', {
            url:'/homePage',
            templateUrl: 'pages/homePage/home-page.html',
            controller:'HomePageController'
        })
            .state('systemAnnouncement', {
                url:'/systemAnnouncement',
                templateUrl: 'pages/homePage/SystemAnnouncement/system-announcement.html',
                controller:'SystemAnnouncementController'
            })
}]);