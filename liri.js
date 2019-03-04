//----------------Require----------------
require("dotenv").config();

var fs = require("fs");
var axios = require('axios');
var moment = require("moment");
var Spotify = require('node-spotify-api');
var keys = require("./keys");

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

//----------------Command Prompt----------------

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



//----------------Spotify---------------- 
var spotify = new Spotify(keys.spotify);
function spotifyThisSong(song) {

    //If no Song, Default to "The Sign" by Ace of Base.
    if (!song) {
        song = "The Sign";
    }

    params = song;
    spotify.search({ type: "track", query: params }, function (err, data) {
        if (!err) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                // Information displayed: Artist(s), The song's name, A preview link of the song from Spotify, The album that the song is from
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
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
function moviethis(movie){
    params = movie
    var URL = "http://www.omdbapi.com/?apikey=Trilogy&t=" + movie;
    if(!movie){
        movie = "Mr. Nobody"
      
        console.log("======================================");

        console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/");
        console.log ("It's on Netflix!");

        console.log("======================================");
    }

    axios.get(URL).then(function(response){
     
        var resData = response.data;

        console.log("======================================");
        var showMovie = [
            "\nTitle: " + resData.Title,
            "Release Year: " + resData.Year,
            "IMDB Rating: " + resData.Ratings[0].Value,
            "Rotten Tomatoes Rating: " + resData.Ratings[1].Value,
            "Country: " + resData.Country,
            "Language: " + resData.Language,
            "Plot: " + resData.Plot,
            "Cast: " + resData.Actors,
        ].join("\n\n");
        console.log(showMovie);
        console.log("======================================");
        
        
    })
}
//----------------Concert----------------

// node liri.js concert-this <artist/band name here>

// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

function concertThis(artist){
    param = artist
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(URL).then(function(response){
        var resData = response.data;
    
        var showConcert = [
            "\nName of the venue: " + resData[0].venue.name,
            "Location: " + resData[0].venue.city,
            "Date: " + moment(resData[0].datetime).format('L')

        ].join("\n\n");
        
        console.log(showConcert);
        
    })
}

//----------------Do What It Says----------------

function doWhatItSays(){

    fs.readFile("random.txt", "utf8", function(error, data){

        var txt = data.split(",");

        runLiri(txt[0],txt[1]);

    });
}

runLiri(search, term);