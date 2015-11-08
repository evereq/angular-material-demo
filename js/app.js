/*global angular */

/**
 * The main app module
 *
 * @type {angular.Module}
 */
angular.module('buyApp', ['ngRoute', 'ngResource', 'ngMaterial'])
	.config(function ($routeProvider,  $mdThemingProvider) {
		'use strict';

		// Configure dark and indigo themes from material
		$mdThemingProvider.theme('dark', 'default')
				.primaryPalette('indigo', {
				})
				.dark();

		var routeConfig = {
			controller: 'appCtrl',
			// We use external Views loaded from /views folder
			templateUrl: 'views/appIndex.html',
			// This way we make sure appCtrl can resolve 'store', which will be injected by router (as controller instantiated by router!)
			resolve: {
				store: function (storage) {
						return storage;
					}
				}
		};

		// We only need one route for now as app is too simple :)
		$routeProvider
			.when('/', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});

