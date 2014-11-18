// ==UserScript==
// @name        Mailcity
// @namespace   https://webmail.lycos.com/?_task=mail
// @include     /^https?://webmail.lycos.com/\?_task=mail$/
// @version     1
// @grant       none
// ==/UserScript==

// The site itself loads jquery
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js

(function() {
	run();
	
	function run() {
		removeTopBarWrapper();
	};
	
	function removeTopBarWrapper() {
		window.setTimeout(function() {
			removeTopBar();
		}, 3000);
	};
	
	function removeTopBar() {
		var $mainDiv = $(".minwidth");
		var mainTop = parseInt($mainDiv.css("top"), 10);
		
		$mainDiv.animate({
			"top": mainTop - 107
		}, 2000);
	};
})();