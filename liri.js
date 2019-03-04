//----------------Require----------------
require("dotenv").config();

var fs = require("fs");
var axios = require('axios');
var Spotify = require('node-spotify-api');
var keys = require("./keys");

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");



// commands :
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says


function runLiri(commands, searchTerm){

    switch (commands) {
        case "concert-this":
            concertThis(searchTerm);
            break;


        case "spotify-this-song":
            spotifyThisSong(searchTerm);
            break;


        case "movie-this":
            moviethis(searchTerm);
            break;


        case "do-what-it-says":
            doWhatItSays();
            break;
        
    };
}

// Information displayed: 
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

//If no Song, Default to "The Sign" by Ace of Base.

//Package node-spotify-api 

//----------------Spotify---------------- 
var spotify = new Spotify(keys.spotify);
function spotifyThisSong(song) {
    
    if (!song) {
        song = "The Sign";
    }

    params = song;
    spotify.search({ type: "track", query: params }, function (err, data) {
        if (!err) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];

                console.log("======================================");
                var showSong = [
                    "Artist(s): " + songData.artists[0].name,
                    "The song's name: "+ songData.name,
                    "A preview link of the song: "+ songData.preview_url,
                    "Album: " + songData.album.name,
                ].join('\n\n');
                console.log(showSong);
                console.log("======================================");
            };
        }
        else {
            return console.log('Error occurred: ' + err);

        }
    });
    
};

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

function moviethis(movie){

    if(!movie){
        movie = "Mr. Nobody"
      
        console.log("======================================");

        console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/");
        console.log ("It's on Netflix!");

        console.log("======================================");
    }

    params = movie 

    request ("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy", function(error, response, body){
        if (!error && response.statusCode == 200){

            var movies = JSON.parse(body);

            console.log("======================================");

            console.log("Title: " + movies.Title);
            console.log("Release Year: " + movies.Year);
            console.log("IMDB Rating: " + movies.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movies.tomatoRating);
            console.log("Country: " + movies.Country);
            console.log("Language: " + movies.Language);
            console.log("Plot: " + movies.Plot);
            console.log("Actors: " + movies.Actors);

            console.log("======================================");
        } 
        else {
            console.log("Error :" + error);
            return;
        }
    });
};

//----------------Concert----------------

// node liri.js concert-this <artist/band name here>

// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

//----------------Do What It Says----------------

function doWhatItSays(){

    fs.readFile("random.txt", "utf8", function(error, data){

        var txt = data.split(",");

        runLiri(txt[0],txt[1]);

    });
}

runLiri(search, term);