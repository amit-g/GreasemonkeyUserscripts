// ==UserScript==
// @name        EnchantedLearningPuzzles
// @namespace   http://www.enchantedlearning.com
// @include     http://www.enchantedlearning.com/*/*/puzzles/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

(function () {
	run();
 
	function run() {
		$("table:first").remove();
		$("center:not(:has(table:first-child))").remove();
		$("form").remove();
		$("hr").remove();
		$("br").remove();
	}
})();