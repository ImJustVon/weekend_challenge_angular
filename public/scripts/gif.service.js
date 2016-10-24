angular.module('giphyApp')
       .service('gifapi', GifAPIService);

function GifAPIService($http) {
  var API = 'http://api.giphy.com/v1/gifs';
  var key = 'api_key=dc6zaTOxFJmzC';
  this.getRandom = function () {

    return $http.get(API + '/random?' + key)
        .then(function (response) {
          var array = [];
          array.push(response.data.data);
          console.log(array);
          return array;
        });
  };

  this.getSearch = function (searchPhrase) {

    return $http.get(API + '/search?q=' + encodeURI(searchPhrase.q.replace(' ', '+')) + '&' + key)
    .then(function (response) {
      return response.data.data;
    });
  };

  this.getCount = function () {

    return $http.get('/favorites/count')
         .then(function (response) {
          return response.data[0].count;
        });
  };

  this.getFavorites = function () {
      return $http.get('favorites/list')
           .then(function (response) {
            console.log(response.data);
            return response.data;
          });
    };

  this.postFavorite = function (url, notes) {
    console.log({ url: url, notes: notes });
    return $http.post('/favorites', { url: url, notes: notes })
                .then(function (response) {
                  return response.data;
                });
  };

  this.deleteFavorite = function (id) {
    $http.delete('/favorites/' + id);
    return $http.get('favorites/list')
         .then(function (response) {
          console.log(response.data);
          return response.data;
        });
  };

}
