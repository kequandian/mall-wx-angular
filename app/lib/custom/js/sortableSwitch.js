/**
 * Created by vincent on 2016/6/18.
 */

angular.module('sortableSwitch', [])
    .directive('sortableSwitch', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                arrowWidth: "@",
                arrowHeight: "@",
                arrowOffset: '@',
                activeColor: '@',
                color: '@',
                sort: '@'
            },
            template:
            '<div class="sortable-switch" ng-click="toggle()" style="padding-right: {{svgHeight}}px">' +

            '<div class="arrow">' +

            '<svg class="up" width="9" height="9" viewBox="0 0 25 25">' +
            '   <polygon points="0,15 20,15 10,0" fill="{{upColor}}">' +
            '</svg>' +

            '<svg class="down" width="9" height="9" viewBox="0 0 25 25" style="bottom:{{arrowOffset}}px">' +
            '   <polygon points="0,0 20,0 10,15" fill="{{downColor}}">' +
            '</svg>' +

            '</div>' +
            '</div>',

            link: link
        };

        function link($scope, $element, $attrs) {

            $attrs.$observe('sort', function (status) {
                //console.log("sort?"+status);
                update($scope, status);
            });

            var status = $scope.sort;
            update($scope, status);

            $scope.toggle = function () {
                status = status == 'asc' ? 'desc' : 'asc';
                update($scope, status);
            }
        }

        function update($scope, status) {
            if (status == undefined || status === null || status.length == 0) {
                status = 'asc';
            }
            $scope.upColor = status == 'asc' ? $scope.activeColor : $scope.color;
            $scope.downColor = status == 'desc' ? $scope.activeColor : $scope.color;
        }
    });
