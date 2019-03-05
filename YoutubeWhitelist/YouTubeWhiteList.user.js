// ==UserScript==
// @name         Allow only whitelisted videos on Youtube
// @author       Amit G
// @namespace    https://github.com/amit_g
// @description  Allow only whitelisted videos on Youtube
// @version      1.0.0
// @match        *://www.youtube.com/*
// @exclude      *://www.youtube.com/embed/*
// @connect      raw.githubusercontent.com
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
    var playerRemovalDecisionMade = false;
    var intervalID;

    console.log("Welcome to youTubeWhiteListed...");

    async function initValues() {
        console.log("initValues...")
        GM.xmlHttpRequest({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/amit-g/GreasemonkeyUserscripts/master/YoutubeWhitelist/YouTubeFilters.json',
            onload: function (response) {
                            youTubeFilters = JSON.parse(response.responseText);
                            console.log(youTubeFilters);
                        }
        });
        console.log("initValues after...");
    }

    await initValues();

    /* INTERVAL FOR BLACKLISTING */

    performWhiteListChecks();
    intervalID = setInterval(performWhiteListChecks, 5000);

    function performWhiteListChecks () {
        console.warn('performWhiteListChecks');
        findOwner();
        checkAndReplacePlayer();

        if (playerRemovalDecisionMade && intervalID) {
            console.log('removal decision made. Clearing the interval for performWhiteListChecks');
            clearInterval(intervalID);
        }
    }

    function findOwner() {
        var $owner = $(ownerSelector);

        if ($owner.length) {
            owner = $owner.text();
            console.log("owner Found...");
        }
        else {
            console.log("owner not Found...");
        }
    }

    function checkAndReplacePlayer() {
        console.log("removePlayer...");

        if (!playerRemovalDecisionCanBeMade()) {
            console.log("returning from removePlayer as not all data is loaded...");

            return;
        }

        playerRemovalDecisionMade = true;

        if (!shouldRemoveVideoPlayer()) {
            console.log("returning from removePlayer as it is whitelisted...");

            return;
        }

        playerRemovalDecisionMade = replacePlayer();
    }

    function replacePlayer() {
        console.log("replacePlayer...");

        var $player = $(videoPlayerSelector);

        if ($player.length) {
            console.log("replacing Player...");
            console.log($player);

            var imageUrl = getPlaceholderImage($player);
            var imageTag = "<image src='" + imageUrl + "'>";

            $player.replaceWith(imageTag);

            return true;
        }
        else {
            console.log("Player not replaced...");

            return false;
        }

        return false;
    }

    function getPlaceholderImage($player) {
        var defaultWidth = 948;
        var defaultHeight = 533;
        var url = "https://via.placeholder.com/" + defaultWidth + "x" + defaultHeight + ".png/333333/CCCCCC?text=Want%20to%20whitelist?%20Send%20A%20Pull%20Request.";
        var width = $player.clientWidth || defaultWidth;
        var height = $player.clientHeight || defaultHeight;

        url = url.replace("defaultWidth", width);
        url = url.replace("defaultHeight", height);

        return url;
    }

    function playerRemovalDecisionCanBeMade() {
        return areFiltersLoaded() && isOwnerFound();
    }

    function shouldRemoveVideoPlayer() {
        return playerRemovalDecisionCanBeMade() && !isOwnerWhilelisted();
    }

    function areFiltersLoaded() {
        console.log('areFiltersLoaded: ' + !!youTubeFilters)
        return !!youTubeFilters;
    }

    function isOwnerFound() {
        console.log('owner: ' + !!owner)
        return !!owner;
    }

    function isOwnerWhilelisted() {
        console.log('isOwnerWhilelisted: ');
        console.log(youTubeFilters);
        console.log(youTubeFilters.whitelist);
        console.log(youTubeFilters.whitelist.owners);
        if (youTubeFilters && youTubeFilters.whitelist && youTubeFilters.whitelist.owners) {
            console.log('youTubeFilters.whitelist.owners.includes(owner): ' + youTubeFilters.whitelist.owners.includes(owner));
            return youTubeFilters.whitelist.owners.includes(owner);
        }
        else {
            console.log('youTubeFilters.whitelist.owners.includes(owner): true is returned');
            return true;
        }
    }

 })(jQuery);