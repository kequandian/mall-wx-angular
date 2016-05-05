angular.module('cart.route', [
    'cart.controller'
]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('cart', {
        url:         '/cart',
        templateUrl: 'pages/cart/cart.html',
        controller: 'CartController'
    })
    .state('cart-settlement', {
        url: '/cart-settlement',
        templateUrl: 'pages/cart/settlement/settlement.html',
        controller: 'SettlementController'
    })
    .state('edit-address', {
        url:         '/editAddress',
        templateUrl: 'pages/cart/settlement/editAddress.html',
        controller: 'EditAddressController'
    })
}]);