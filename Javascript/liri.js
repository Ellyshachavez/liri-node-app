require("dotenv").config();

// commands :
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// should be able to console log: node liri.js concert-this <artist/band name here>

// Information displayed: 
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

//If no Song, Default to "The Sign" by Ace of Base.

//Package node-spotify-api 

//----------------Spotify----------------

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: SPOTIFY_ID,
  secret: SPOTIFY_SECRET
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

//----------------MOVIE----------------

//Command line node liri.js movie-this '<movie name here>'
// Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

var axios = require("axios");

axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
   
    console.log("The movie's rating is: " + response.data);
  }
);

//----------------Concert----------------


