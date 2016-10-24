angular.module('giphyApp')
       .controller('FavoritesController', FavoritesController);

function FavoritesController(gifapi) {
  var fav = this;

  fav.gifsArray = [];
  fav.notes = '';

  fav.getFavorites = function () {
    gifapi.getFavorites().then(function (list) {
      console.log(list);
      main.gifsArray = list;
    });
  };

  fav.deleteFavorite = function (index) {
      gifapi.deleteFavorite(main.gifsArray[index].id).then(function (list) {
        main.gifsArray = list;
      });
    };

  fav.updateFavorite = function (index) {
    gifapi.updateFavorite(main.gifsArray[index].id, main.gifsArray[index].url, main.notes).then(function (list) {
      main.gifsArray = list;
      main.notes = null;
    });
  };

};
