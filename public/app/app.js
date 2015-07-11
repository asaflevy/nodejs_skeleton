var app = angular.module('myApp', ['ngResource', 'ui.router']);


(function () {
    "use strict";
    app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
        // set up the states
        $stateProvider
            .state('/test', {
                url: "/test",
                templateUrl: "/partials/test.html"
            });
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
    });
}());

