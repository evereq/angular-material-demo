/*global angular */

angular.module('buyApp')
	.factory('storage', function () {
		'use strict';

		var STORAGE_ID = '2buy-products';

		return {

			get: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			put: function (products) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(products));
			}
		};

	});
