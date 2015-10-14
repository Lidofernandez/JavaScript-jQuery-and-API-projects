"use strict";

/*Getting the Google API.......................................................................................*/

function APIurl (index) {

	/*......................................................*/
	// var apiKey = ""; 
	// var searchGoogleID = "";
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

				printWebResults(dataLinks);

			} else {
				// message = "HTTP error "+hrx.status+" "+hrx.statusText;
				// print(message); in process
				console.log("HTTP error "+hrx.status+" "+hrx.statusText);
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

function printWebResults(dataLinks) {
var totalResults = dataLinks.queries;
if ( parseInt(totalResults.request[0].totalResults) > 0)	{
	console.log(parseInt(totalResults.request[0].totalResults));
	var printLinks = "<h2>Web results</h2>";
		printLinks += '<ul class="links">';
	for (var i = 0; i < dataLinks.items.length; i += 1) {
		printLinks += '<div class="formatLinks">';
		printLinks += '<li class="tittleLink">' + dataLinks.items[i].htmlTitle + '</li>';
		printLinks += '<li><a href="' + dataLinks.items[i].link + '">' + dataLinks.items[i].link + '</a></li>';
		if (dataLinks.items[i].pagemap) {
		printLinks += '<table class="description"><tr><td><a href="'+ dataLinks.items[i].link +'"><img src="'+ dataLinks.items[i].pagemap.cse_image[0].src+'" alt = "imgSection"></a></td>';
		}
		printLinks += '<td><p>' + dataLinks.items[i].snippet + '</p></td></tr></table>';
		printLinks += '</div>';
	}
	printLinks += '</ul>';
	
	document.getElementById("displayWebResults").innerHTML = printLinks;

	
	if (parseInt(totalResults.request[0].totalResults) > 0) {
		var pages = Math.round(parseInt(totalResults.request[0].totalResults)/10);
		console.log(pages);
		var displayPages = document.getElementById("displayPages");
		var printNavigation = "<ul>";
		if (pages > 10) {

			//create elements with javaScript http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_createelement2

			function displayPagesList (i) {
				printNavigation += '<li><button type="button" ';
				printNavigation += 'onclick= "' + AJAXrequest.bind(null, APIurl(i*10+1)) + ';" ';
				printNavigation += ' >'+ parseInt(i) +'</button</li>';
			};
			for (var i = 1; i <= 10; i+=1) {
				displayPagesList(i);
			}
		} else if (pages <= 10) {
			for (var i = 2; i <= pages; i+=1) {
				printNavigation += '<li><button type="button" '+ displayPages.addEventListener('click', AJAXrequest.bind(null, APIurl(i*10+1)), false) +' ">'+ parseInt(i) +'</button</li>';
			}
		}
	}
	printNavigation += '</ul>';
	document.getElementById('displayPages').innerHTML = printNavigation; 

/*Describing errors information........................................................*/	

} else {
	message = "<p>Ups... the following terms were not found: </p>" + document.getElementById("search").value;
	print(message);
} 

};

/*Handlers.................................................*/

var startSearch = document.getElementById("submit");
startSearch.addEventListener('click', googleSearch, false);
