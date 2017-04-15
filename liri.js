var key = require("./key.js");
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

var nodeArr = process.argv;

var command = process.argv[2];

var searchTerm = "";
var searchExists = false;




if (command === "my-tweets"){
	var client = new twitter ({
		consumer_key: key.twitterKeys.consumer_key,
		consumer_secret: key.twitterKeys.consumer_secret,
		access_token_key: key.twitterKeys.access_token_key,
		access_token_secret: key.twitterKeys.access_token_secret
	});

	var params = {screen_name: "cloudy_suit", count: 20};
	client.get("statuses/user_timeline", params, function(error, tweets, response){
		if(error){
			console.log(error)
		}
		else{

		for (var i = 0; i < tweets.length; i++){
			console.log(tweets[i].created_at);
			console.log(tweets[i].text);
		}
		}
	});

	
};

if (command === "spotify-this-song" && process.argv[3] !== null){

	

	for (var i = 3; i < nodeArr.length; i++){
		if (i > 3 && i < nodeArr.length){
			searchTerm = searchTerm + "+" + nodeArr[i];
			searchExists = true;
		}


		else {
			searchTerm += nodeArr[i];
			searchExists = true;
		}
	}


	spotify.search({type: "track", query: searchTerm}, function(err, data){

		if(err){
			console.log(err);
		}
		else{
			console.log(data.tracks.items[0].name);
			console.log(data.tracks.items[0].artists[0].name);
			console.log(data.tracks.items[0].album.name);

		}
});

};

if (command === "spotify-this-song" && searchExists === false){



	spotify.search({type: "track", query: "The Sign"}, function(err, data){

		if(err){
			console.log(err);
		}
		else{
			console.log(data.tracks.items[0].name);
			console.log(data.tracks.items[0].artists[0].name);
			console.log(data.tracks.items[0].album.name);

		}
});
}


if (command === "movie-this"){

	for (var i = 3; i < nodeArr.length; i++){
		if (i > 3 && i < nodeArr.length){
			searchTerm = searchTerm + "+" + nodeArr[i];
		}


		else {
			searchTerm += nodeArr[i];
		}
	}

	request("http://www.omdbapi.com/?t="+ searchTerm, function (err, response, body) {

		if (err){
			console.log(err);
		}

		else{
			console.log(JSON.parse(body).Title);
			console.log(JSON.parse(body).Year);
			console.log(JSON.parse(body).Ratings[0]);
			console.log(JSON.parse(body).Language);
			console.log(JSON.parse(body).Actors);
			console.log(JSON.parse(body).Plot);
			console.log(JSON.parse(body).Ratings[1]);

		}
	});

};

if (command === "do-what-it-says"){

	fs.readFile("random.txt", "utf8", function(error, data){
		var randomArr = data.split(",");
		console.log(randomArr);

		for (i in randomArr){
			console.log(randomArr[i]);
		}
	});
};