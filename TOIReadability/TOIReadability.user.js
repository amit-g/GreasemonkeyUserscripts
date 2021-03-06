// ==UserScript==
// @name        TOIReadability
// @namespace   http://timesofindia.indiatimes.com/
// @description Opens the content pages with readability
// @include     /^https?://timesofindia.indiatimes.com/.*/articleshow/[0-9]+\.cms$/
// @version     1
// @grant       none
// ==/UserScript==

(function () {
	run();
 
	function run() {
		if (document.referrer && document.referrer.indexOf("www.readability.com") == -1) {
			readNow();
		}
	}
	
	function readNow() {
		window.baseUrl = 'http://www.readability.com';
		window.readabilityToken = 'GJxVpH9uQtHk6r7UXH2D3v9aVRJyGCS8Mh3EmMMD';
		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.setAttribute('charset', 'UTF-8');
		s.setAttribute('src', baseUrl + '/bookmarklet/read.js');
		document.documentElement.appendChild(s);
	}
})();