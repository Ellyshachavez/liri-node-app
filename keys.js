
console.log('this is loaded');
var prompt = [
  "Choose any of these commands: ",
"concert-this",
"spotify-this-song",
"movie-this",
"do-what-it-says"
]

console.log(prompt)

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  };