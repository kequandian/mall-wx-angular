/**
 * Created by vincent on 2016/6/18.
 */

angular.module('levelProgress', [])
    .directive('levelProgress', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                value: "@"
            },
            template:   "<div class='level-progress'>" +
                            "<p class='level-progress-bar'><span class='level-progress-status' style='width:{{value}}%'></span></p>" +
                        "</div>",
        };
    });