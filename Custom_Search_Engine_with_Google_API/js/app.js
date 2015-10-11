"use strict";

/*Getting the Google API.......................................................................................*/

document.getElementById("displayPages").style.visibility = "hidden";

var message;

function APIurl (index) {

	/*......................................................*/
	//var apiKey = "Place here your own API Key"; 
	//var searchGoogleID = "Play Here the ID of the Search Engine you want to set up";
	/*......................................................*/

	var searchInput = document.getElementById("search").value;
	var numberOfPages = 10;//select the number of pages you want to see
	var requestPageIndex = index;
	var googleUrl = "https://www.googleapis.com/customsearch/v1?";
	googleUrl += "key=" + apiKey;
	googleUrl += "&cx=" + searchGoogleID;
	googleUrl += "&q=" + searchInput;
	googleUrl += "&num=" + numberOfPages;
	googleUrl += "&start=" + requestPageIndex;
	return googleUrl;
};

/*AJAX part.....................................................................................................*/

function AJAXrequest (url) {

	var hrx = new XMLHttpRequest();
	hrx.onreadystatechange = function () {
		if (hrx.readyState === 4 ) {
			if (hrx.status === 200 ) {				
				var dataLinks = JSON.parse(hrx.responseText); //
				console.log(dataLinks);

				/*Checking results.......................................................................*/

				var totalResults = dataLinks.queries;
				if ( totalResults.request[0].totalResults > 0)	{
					printlinksPhotos(dataLinks);
					var message = "";
      				document.getElementById('message').innerHTML = message;

				/*Describing errors information........................................................*/	

				} else {
					
					message = "<p>Ups... the following terms were not found: </p>" + document.getElementById("search").value;
					print(message);
					document.getElementById("search").value = "";

				} 

			} else {
				message = "HTTP error "+hrx.status+" "+hrx.statusText;
				print(message);
			}
		}

	};

	/*Send and GET resquest ............................................................................*/

	console.log(url);
	hrx.open('GET', url, true);
	hrx.send();

};

/*Getting Google Results......................................................................................*/

function googleSearch (event) {
	if (document.getElementById("search").value !== "") {
		AJAXrequest(APIurl(1));
		var message = "";
      	document.getElementById('message').innerHTML = message;
      	document.getElementById("displayPages").style.visibility = "visible"; 

	/*Errors messages for the search Box...................................................................*/

	} else {
		message = "<p>Please type a term for searching</p>";
		print(message);

	}

	event.preventDefault();

};

/*Printer for error messages..............................*/

function print(message) {

	document.getElementById("message").innerHTML = message;
	return message;
};

/*Printer for images and links....................................*/

function printlinksPhotos(dataLinks) {
	var printLinks = '<ul class="links">';
	var printPhotos = '<ul class="photos">';
	for (var i = 0; i < dataLinks.items.length; i += 1) {
		printLinks += '<div class="formatLinks">';
		printLinks += '<li class="tittleLink">' + dataLinks.items[i].htmlTitle + '</li>';
		printLinks += '<li><a href="' + dataLinks.items[i].link + '">' + dataLinks.items[i].link + '</a></li>';
		printLinks += '<p>' + dataLinks.items[i].snippet + '</p>';
		printLinks += '</div>';
		if (dataLinks.items[i].pagemap.cse_image) {
			printPhotos += '<li class="image"><img src="'+ dataLinks.items[i].pagemap.cse_image[0].src+'" alt = "imgSection"></li>';
			printPhotos += '</ul>';
			document.getElementById("displayPhotos").innerHTML = printPhotos;				
		}
	}
	printLinks += '</ul>';
	document.getElementById("displayLinks").innerHTML = printLinks;
	
};

/*Handlers.................................................*/

var startSearch = document.getElementById("submit");
startSearch.addEventListener('click', googleSearch, false);

