angular.module('giphyApp')
       .controller('MainController', MainController);

function MainController(gifapi) {
  var main = this;
  console.log('Maincontroller loaded');

  main.gifsArray = [];
  main.count = 0;
  main.notes = '';

  main.getRandom = function () {
    gifapi.getRandom().then(function (gif) {
      console.log(gif);
      main.gifsArray = gif;
    });
  };

  main.getSearch = function () {
    gifapi.getSearch(main.searchPhrase).then(function (list) {
      main.gifsArray = list;
    });

  };

  main.postFavorite = function (index) {
    var url;
    if (main.gifsArray[index].images != undefined) {
      url = main.gifsArray[index].images.original.url;
    } else {
      url = main.gifsArray[index].image_original_url;
    }

    gifapi.postFavorite(url, main.notes);

    gifapi.getCount().then(function (count) {
      main.count = count;
    });
  };

  main.getCount = function () {
      gifapi.getCount().then(function (count) {
        main.count = count;
      });
    };

  main.getFavorites = function () {
    gifapi.getFavorites().then(function (list) {
      console.log(list);
      main.gifsArray = list;
    });
  };

  main.deleteFavorite = function (index) {
      gifapi.deleteFavorite(main.gifsArray[index].id).then(function (list) {
        main.gifsArray = list;
      });
    };

  main.updateFavorite = function (index) {
    gifapi.updateFavorite(main.gifsArray[index].id, main.gifsArray[index].url, main.notes).then(function (list) {
      main.gifsArray = list;
      main.notes = null;
    });
  };

};
