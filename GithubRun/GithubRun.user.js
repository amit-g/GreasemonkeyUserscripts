// ==UserScript==
// @name        Github.com Run
// @namespace   http://www.github.com
// @description Adds a Run button to Github.com source files
// @include     https://github.com/*/blob/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       none
// ==/UserScript==

(function () {
	run();
 
	function run() {
		console.log("Run");
		addRunMenu();
	}
	
	function addRunMenu() {
		var $rawButton = $("#raw-url");
		var updatedHref = "http://rawgithub.com" + $rawButton.attr("href").replace("/raw", "");
        $rawButton.clone()
                    .attr("href", updatedHref)
                    .attr("id", "rawgithub-raw-url")
                    .text("Run")
                    .prependTo($rawButton.parent())
        ;
	}
})();