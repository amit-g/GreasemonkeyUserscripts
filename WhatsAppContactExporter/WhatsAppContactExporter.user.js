// ==UserScript==
// @name        WhatsAppContactExporter
// @namespace   https://web.whatsapp.com/
// @version     1
// @include     https://web.whatsapp.com/*
// @require     https://code.jquery.com/jquery-3.2.1.slim.min.js
// @grant       none
// ==/UserScript==

(function () {
	run();
 
	function run() {
		addExportContactsButton(exportContacts);
	}
	
	function addExportContactsButton(callback) {
        $(document).on("click", ".dropdown div.dropdown-item-action:contains('Group info')", function() {
            window.setTimeout(function() {
                var $groupInfoDiv = $("header div:contains('Group info').header-title");
                var span = '<span class="lock-icon icon icon-share export-contacts" title="Export (Contacts are lazy loaded. Scroll to the bottom before exporting.)"></span>';
                $groupInfoDiv.append(span);

                $(".export-contacts").on("click", callback);
            }, 1000);               
        });
	}
    
	function exportContacts() {
		var chats = document.querySelectorAll("div.chat");
        for (var i = 0; i < chats.length; i++) {
            var chat = chats[i];

            var titleSpan = chat.querySelector("div.chat-title > span");
            var title = titleSpan.getAttribute("title");

            var metaSpan = chat.querySelector("div.chat-meta > span");
        }
	}
})();