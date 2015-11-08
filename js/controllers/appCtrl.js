/*global angular */

angular.module('buyApp')
	.controller('appCtrl', function AppCtrl($scope, $routeParams, $filter, $mdToast, store) {
		'use strict';

		var products = $scope.products = [];

		// Where we want to show toast messages on the screen
		var toastPosition = {
			bottom: false,
			top: true,
			left: false,
			right: true
		};

		$scope.newProduct = '';

		$scope.filterProducts = '';

		$scope.removeProduct = function (product) {
			products.splice(products.indexOf(product), 1);
		};

		// Add new product to the list as not completed and reset input box & filter
		$scope.addProduct = function () {

			var newProduct = {
				title: $scope.newProduct.trim(),
				completed: false
			};

			if (!newProduct.title) {
				return;
			}

			products.push(newProduct);

			// We want to remove what user type as we already add that product to our list
			$scope.newProduct = '';

			// We most probably want to reset filter to make sure user always see product he just add to the list (so it's not get filtered out if product name is in the filter)
			$scope.filterProducts = '';
		};

		// In toast we want to work with object which define position, so we need this function to convert to string
		var getToastPosition = function() {
			return Object.keys(toastPosition)
					.filter(function(pos) { return toastPosition[pos]; })
					.join(' ');
		};

		// show message on screen as toast (will be removed automatically in 3 sec)
		var showMessage = function (message) {
			$mdToast.show(
					$mdToast.simple()
							.content(message)
							.position(getToastPosition())
							.hideDelay(3000)
			);
		};

		$scope.saveProducts = function () {
			store.put(products);
			showMessage('Your loved products list was just saved to your browser storage!');
		};

		$scope.loadProducts = function () {
			// We most probably want to reset filter to make sure user always see products we just load
			$scope.filterProducts = '';
			products = $scope.products = store.get();
			showMessage('Your loved products list was just loaded from the browser storage!');
		}

	});
