// ==UserScript==
// @name        Github.com Run
// @namespace   http://www.github.com
// @description Adds a Live Run button to Github.com source files
// @include     https://github.com/*/*
// @version     1
// @require     
// @grant       none
// ==/UserScript==

(function () {
	run();
 
	function run() {
		setupAjaxInterception();
		addRunMenu();
	}
	
	function setupAjaxInterception() {
		$(document).ajaxSuccess(function(event, xhr, settings) {
			if (settings.url.indexOf("blob") !== -1) {
				console.log( "Triggered ajaxSuccess handler. The ajax url was: " + settings.url);
				addRunMenu();
			}
		});
	}
	
	function addRunMenu() {
		var $rawButton = $("#raw-url:not(.rawgithub-added)");
		
		if ($rawButton.length === 0) {
			return;
		}
		
		var updatedHref = "http://rawgithub.com" + $rawButton.attr("href").replace("/raw", "");
		
        $rawButton.clone()
                    .attr("href", updatedHref)
                    .attr("id", "rawgithub-raw-url")
                    .text("Live Run")
					.attr("title", "Clicking this button will open this page via rawgithub.com")
					.addClass("tooltipped")
                    .prependTo($rawButton.parent())
        ;
		
		$rawButton.addClass("rawgithub-added");
	}
})();