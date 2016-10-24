angular.module('giphyApp')
       .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
          templateUrl: 'views/main.html',
        }).when('/favorite', {
          templateUrl: 'views/favorite.html',
        });
        $locationProvider.html5Mode(true);
      });
