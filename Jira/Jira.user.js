// ==UserScript==
// @name        Jira
// @namespace   https://ipayment.atlassian.net/browse/
// @description Changes the changeset to a link
// @include     /^https://ipayment.atlassian.net/browse/[A-Z]+-[0-9]+$/
// @version     1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
// @grant       none
// ==/UserScript==

(function () {
	run();
 
	function run() {
		detectChangesetsAndMakeTfsLink();
	}
	
	function detectChangesetsAndMakeTfsLink() {
    var baseTfsLink = "http://iProject:8080/tfs/main/_versionControl/changeset?id=";
    
    $(".activity-comment .action-body").each(function(){
      var html = $(this).html();
      if (html.indexOf("Changeset") != -1) {
        var re = /(Changeset[s: ]*)([0-9]+)/ig;
        html = html.replace(re, "<a href='" + baseTfsLink + "$2' target='_blank'>$1 $2</a>");
        $(this).html(html)
      }
    });
	}
})();