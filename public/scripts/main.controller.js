angular.module('giphyApp')
       .controller('MainController', MainController);

function MainController(gifapi) {
  var main = this;
  console.log('Maincontroller loaded');

  main.gifs = {};
  main.gifsArray = [];

  main.getRandom = function () {
    gifapi.getRandom().then(function (gif) {
      main.gifs = gif;
    });
  };

  main.getSearch = function () {
    gifapi.getSearch(main.searchPhrase).then(function (list) {
      main.gifsArray = list;
    });

  };

};
