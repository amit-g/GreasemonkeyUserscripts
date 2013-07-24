// ==UserScript==
// @name        Chess.com Chessboards Printing
// @namespace   http://www.chess.com
// @description Adds a PRINT CHESSBOARDS button to Chess.com for chessboards printing
// @include     http://www.chess.com/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       none
// ==/UserScript==

(function () {
	run();
 
	function run() {
		addPrintMenu(removeEverythingExceptChessBoards);
	}
	
	function addPrintMenu(callback) {
		var $nav = $("#nav");
		var li = "<li><a href='#' class='print-chessboards'>PRINT CHESSBOARDS</a></li>";
		$nav.append(li);
		
		$(".print-chessboards").on("click", callback);
	}
	
	function removeEverythingExceptChessBoards() {
		var $chessDiagrams = $(".chessDiagram_Main");
		
		$("body").empty();
		$("body").css('background', 'none');
		$("body").append($chessDiagrams);
		
		$(".chess_boardprompt").remove();
	}
})();
