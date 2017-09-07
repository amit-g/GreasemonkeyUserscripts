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
        var $container = $(this).closest(".drawer-manager");
        var $chats = $("div.chat", $container);
        
        console.log("Exporting " + $chats.length + " Contacts...");
        
        $chats.each(function(i) {
            var $chat = $(this);
            var $titleSpan = $("div.chat-title > span", $chat);
            var phoneNumber = $titleSpan.attr("title");
            var $metaSpan = $("div.chat-meta > span", $chat);
            var name = $metaSpan.text();
            
            console.log('|"' + (i+1) + '"|"' + phoneNumber + '"|"' + name + '"|');
        });
	}
})();