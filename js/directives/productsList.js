/*global angular */

angular.module('buyApp')
    .directive('productsList', function Products() {
        'use strict';

        return {
            restrict: 'E',
            scope: {
                deleteProduct: '&',
                products: '=list',
                filterProducts: '=filter'
            },
            templateUrl: 'views/productsList.html'
        };

    });
