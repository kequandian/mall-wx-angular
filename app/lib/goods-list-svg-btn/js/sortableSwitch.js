/**
 * Created by vincent on 2016/6/18.
 */

angular.module('sortableSwitch', [])
    .directive('sortableSwitch', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                svgWidth:"@",
                svgHeight:"@",
                activeColor: '@',
                color: '@',
                offset: '@',
                arrow:'@'
            },
            template:   '<div class="sortable-switch-panel"   ng-click="toggle()" style="padding-right: {{svgHeight}}px">' +
                
                            '<div class="arrow_btn">'+

                                '<svg class="sortable-switch-up" width="{{svgWidth}}" height="{{svgHeight}}"  viewBox="0 0 25 25">' +
                                    '<polygon points="0,15 20,15 10,0" fill="{{upColor}}">' +
                                '</svg>'  +
                
                                '<svg class="sortable-switch-down" style="bottom:{{offset}}px" width="{{svgWidth}}" height="{{svgHeight}}" viewBox="0 0 25 25">' +
                                    '<polygon points="0,0 20,0 10,15" fill="{{downColor}}">' +
                                '</svg>' +
                
                            '</div>'+
                
                        '</div>',
            
            link: link

        };

        function link($scope, $element, $attrs) {

            console.log("arrow:" + $scope.arrow);

            var status = $scope.arrow;
            console.log("arrow?"+status);
            if(status == undefined || status===null || status.length==0){
                status = 'asc';
            }

            $scope.upColor = status == 'asc'? $scope.activeColor : $scope.color;
            $scope.downColor = status == 'desc' ? $scope.activeColor : $scope.color;
            console.log('scope.desc?' + $scope.upColor);
            console.log('scope.desc?' + $scope.downColor);

            $scope.toggle = function () {
                status =  status=='asc' ? 'desc' : 'asc';
                console.log("status="+status);

                $scope.upColor = status=='asc' ? $scope.activeColor : $scope.color;
                $scope.downColor = status=='desc' ? $scope.activeColor : $scope.color;

                // console.log($scope.desc)

            }

        }


    })
