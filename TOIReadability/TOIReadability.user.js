// ==UserScript==
// @name        TOIReadability
// @namespace   http://timesofindia.indiatimes.com/
// @include     /^https?://timesofindia.indiatimes.com/.*/articleshow/[0-9]+\.cms$/
// @version     1
// @grant       none
// ==/UserScript==

(function () {
	run();
 
	function run() {
		if (document.referrer.indexOf("www.readability.com") == -1) {
			readNow();
		}
	}
	
	function readNow() {
		window.baseUrl = 'http://www.readability.com';
		window.readabilityToken = '';
		var s = document.createElement('script');
		s.setAttribute('type', 'text/javascript');
		s.setAttribute('charset', 'UTF-8');
		s.setAttribute('src', baseUrl + '/bookmarklet/read.js');
		document.documentElement.appendChild(s);
	}
})();