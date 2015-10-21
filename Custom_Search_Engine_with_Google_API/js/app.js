"use strict";

function sendAjax (event) {
	if (document.getElementById("search").value !== "") {
		body(url(), printResults, numberOfPages);
	} else {
		console.log("Please type a term for search");
	}
	event.preventDefault();
};
var submitButton = document.getElementById("submit");
submitButton.addEventListener('click', sendAjax, false);

function body (url, printResults, numberOfPages) {
	var hrx = new XMLHttpRequest();
		hrx.onreadystatechange = function () {
			if (hrx.readyState === 4 ) {
				if (hrx.status === 200 ) {				
					var dataLinks = JSON.parse(hrx.responseText); //
					printResults(dataLinks);
					numberOfPages(dataLinks);
					console.log(dataLinks);
				} else {
					console.log("HTTP error "+hrx.status+" "+hrx.statusText);
				}
			} else {
				console.log(hrx.readyState);
			}
		};
		hrx.open('GET', url, true);
		console.log(url);
		hrx.send();
};

function footer (url, printResults) {
	var hrxFooter = new XMLHttpRequest();
		hrxFooter.onreadystatechange = function () {
			if (hrxFooter.readyState === 4 ) {
				if (hrxFooter.status === 200 ) {				
					var dataLinks = JSON.parse(hrxFooter.responseText); //
					printResults(dataLinks);
					console.log(dataLinks);
				} else {
					console.log("HTTP error "+hrxFooter.status+" "+hrxFooter.statusText);
				}
			} else {
				console.log(hrxFooter.readyState);
			}
		};
		hrxFooter.open('GET', url, true);
		console.log(url);
		hrxFooter.send();
};

function url (index) {
	/*......................................................*/
	var apiKey = "AIzaSyCq2i7QqN9cXepXLsCqPTYfzvCJyo8Scd0"; 
	var searchGoogleID = "004975204272958123692:mhgx86zgpoa";
	/*......................................................*/
	var searchInput = document.getElementById("search").value;
	var googleUrl = "https://www.googleapis.com/customsearch/v1?";
	googleUrl += "key=" + apiKey;
	googleUrl += "&cx=" + searchGoogleID;
	googleUrl += "&q=" + searchInput;
	if (index !== undefined) {
		googleUrl += "&start=" + index;
	}
	return googleUrl;
};

function printResults (dataLinks) {
	var printLinks = "<h2>Web results</h2>";
		printLinks += '<ul class="links">';
	for (var i = 0; i < dataLinks.items.length; i += 1) {
		printLinks += '<div class="formatLinks">';
		printLinks += '<li class="tittleLink">';
		printLinks += dataLinks.items[i].htmlTitle + '</li>';
		printLinks += '<li><a href="' + dataLinks.items[i].link + '">'; 
		printLinks += dataLinks.items[i].link + '</a></li>';
		if (dataLinks.items[i].pagemap) {
		printLinks += '<table class="description"><tr><td><a href="';
		printLinks += dataLinks.items[i].link;
		printLinks += '"><img src="';
		printLinks += dataLinks.items[i].pagemap.cse_image[0].src;
		printLinks += '" alt = "imgSection"></a></td>';
		}
		printLinks += '<td><p>' + dataLinks.items[i].snippet;
		printLinks += '</p></td></tr></table>';
		printLinks += '</div>';
	}
		printLinks += '</ul>';
	document.getElementById("displayWebResults").innerHTML = printLinks;

};

function numberOfPages (dataLinks) {
	if (parseInt(dataLinks.queries.request[0].totalResults) > 0) {
		var displayPages = document.getElementById('displayPages');
		var pages = Math.round(parseInt(dataLinks.queries.request[0].totalResults)/10);
		console.log(pages);
		if (pages > 10) {
			function add (i) {
			    var element = document.createElement("button");
			    element.setAttribute("type", "button");
			    element.innerHTML = i + 1;
			    element.onclick = function() {
			        footer(url(i*10+1), printResults);
			    } 
			    var foo = document.getElementById("displayPages");
			    foo.appendChild(element);
			}
			for (var i = 0; i <= 9; i+=1) {
				add(i);
			}
		}
	}
};