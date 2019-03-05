// ==UserScript==
// @name         Allow only whitelisted videos on Youtube
// @author       Amit
// @namespace    https://github.com/amit_g
// @description  Allow only whitelisted videos on Youtube
// @version      1.0.0
// @match        *://www.youtube.com/watch*
// @exclude      *://www.youtube.com/embed/*
// @grant        GM.xmlHttpRequest 
// @require      https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require      https://code.jquery.com/jquery-3.2.1.slim.min.js     
// ==/UserScript==

/** DESCRIPTION
**/

(async function($) {

    /* Constants */
    const ownerSelector = '#owner-container a';
    const videoPlayerSelector = 'ytd-player';

    /* Variables */
    var youTubeFilters;
    var owner;

    async function initValues() {
        GM.xmlHttpRequest({
            method: 'GET',
            url: 'https://gist.githubusercontent.com/amit-g/9888db1a54209f0e7223c32c451638e4/raw/edfbad904017e3ca671347607cb25f12f8d54dfb/YouTubeFilters.json',
            onload: function (response) {
                            youTubeFilters = JSON.parse(response.responseText);
                            //console.log(youTubeFilters);
                        }
        });
    }

    await initValues();
 
    performWhiteListChecks();
    setInterval(performWhiteListChecks, 5000);

    function performWhiteListChecks () {
        findOwner();
        removePlayer();
    }
 
    function findOwner() {
        var $owner = $(ownerSelector);
        if ($owner.length) {
            owner = $owner.text();
        }
    }

    function removePlayer() {
        if (!shouldRemoveVideoPlayer()) {
            return;
        }

        $player = $(videoPlayerSelector);

        if ($player.length) {
            $player.remove();
        }
    }

    function shouldRemoveVideoPlayer() {
        return areFiltersLoaded() && isOwnerFound() && !isOwnerWhilelisted();
    }

    function areFiltersLoaded() {
        return !!youTubeFilters;
    }

    function isOwnerFound() {
        return !!owner;
    }

    function isOwnerWhilelisted() {
        if (youTubeFilters && youTubeFilters.whitelist && youTubeFilters.whitelist.owners) {
            return youTubeFilters.whitelist.owners.includes(owner);
        }
        else {
            return true;
        }
    }
 
 })(jQuery);