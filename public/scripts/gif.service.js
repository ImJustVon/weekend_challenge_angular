angular.module('giphyApp')
       .service('gifapi', GifAPIService);

function GifAPIService($http) {
  var API = 'http://api.giphy.com/v1/gifs';
  var key = 'api_key=dc6zaTOxFJmzC';
  this.getRandom = function () {

    return $http.get(API + '/random?' + key)
        .then(function (response) {
          return response.data.data;
        });
  };

  this.getSearch = function (searchPhrase) {

    return $http.get(API + '/search?q=' + encodeURI(searchPhrase.q.replace(' ', '+')) + '&' + key)
    .then(function (response) {
      return response.data.data;
    });
  };

}
