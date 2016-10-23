angular.module('giphyApp')
       .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
          templateUrl: 'views/main.html',
        }).when('/favorites', {
          templateUrl: 'views/favorites.html',
        });
        $locationProvider.html5Mode(true);
      });
