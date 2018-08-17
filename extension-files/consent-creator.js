<<<<<<< HEAD
/*
/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/
	/*
	NAME: initiateCookie
	PURPOSE: processes "tabs" variable and sends it to removeCookies and addGVCC
	*/
	function initiateCookie()
	{
		function success(e)
		{
			browser.webNavigation.onCommitted.removeListener(initiateCookie);
			console.log("cookie");
		}
		/*
		NAME: addGVCC
		PURPOSE: Creates a new GVCC and adds it to the browser
		*/
		function addGVCC(tabs)
		{
			//100% consent "BOSl-jdOSl-jlABABBENBd-AAAAgV______________________________________________________________________________________A"
			//0% consent "BOSmIULOSmIUTABABBENBdAAAAAgWAAA"
			//this seems to work pretty well for every website
			domain = tabs[0].url.split('/')[2];
				var cookieset = browser.cookies.set
				({
					url: tabs[0].url,
					name: "euconsent",
					value: "BOSmIULOSmIUTABABBENBdAAAAAgWAAA",
					httpOnly: false,
					//temporary
					expirationDate: 1568133479,
					path: "/",
					firstPartyDomain: "",
					storeId: "firefox-default",
					domain: domain
				})
				cookieset.then(success);
		}
	//Retrieves information of current tab.
	var getActive = browser.tabs.query
	({
		active: true,
		currentWindow: true
	});
	getActive.then(addGVCC);
	}
	console.log("Begin consent-creator.js");
	//Listeners for actions that would provoke a dialog
	browser.tabs.onActivated.addListener(initiateCookie)
	browser.webNavigation.onCommitted.addListener(initiateCookie);
	browser.webNavigation.onDOMContentLoaded.addListener(initiateCookie);
	
=======
"use strict";

/**
 * Processes "tabs" variable and sends it to removeCookies and addGVCC
 */
async function initiateCookie() {
	browser.webNavigation.onCommitted.removeListener(initiateCookie);
	let tabs = await browser.tabs.query({active: true, currentWindow: true});
	var urlSet = tabs[0].url;
	var nameSet = "euconsent";
	var valueSet = "No value set!";
	var httpOnlySet = false;
	var pathSet = "/";
	var firstPartyDomainSet = "";
	var storeIdSet = "firefox-default";
    // this seems to work pretty well for every website
    var domain = tabs[0].url.split("/")[2];
	var domainSet = "." + domain;
	/*
	__________________________________________________________
	Navigating the publisher consent string switch stsatment
	__________________________________________________________
	The above logged value, "Domain to set", is a value that is
	shown to you and entered here to specify a website's domain 
	to put a GVCC and other required parameters into the cookie.
	An example switch section would be:
	
		case "www.independent.co.uk":
			valueSet = "BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA";
			urlSet = "https://www.independent.co.uk/";
	
	Most of the values outside the main value stay the same,
	but any of the variables (of course) can be overridden.
	The best thing this can be used for is name changes, as
	there are some mincor capitalization differences that
	eventually warrant this statement.
	__________________________________________________________
	*/
	switch(domain) {
		//placeholder statement
		case "www.independent.co.uk":
			valueSet = "BOSl-jdOSl-jlABABBENBd-AAAAgV______________________________________________________________________________________A";
		default:
			valueSet = "BOSl-jdOSl-jlABABBENBd-AAAAgV______________________________________________________________________________________A";
	}
	//console.log("Setting cookie value: " + valueSet.substr(0,16) + "....");
	await browser.cookies.set({
		url: urlSet,
		name: nameSet,
		value: valueSet,
		httpOnly: httpOnlySet,
		path: pathSet,
		firstPartyDomain: firstPartyDomainSet,
		storeId: storeIdSet,
		domain: domainSet
	});
	//Temporary fix for window issue described below.
	main();
	broswer.webNavigation.onCreatedNavigationTarget.addListener(main);
	browser.tabs.onActivated.addListener(main);
}

//Would like to call this on navigation to a new
//webpage, but cannot find an API for it.
function main() {

	// Listeners for actions that would provoke a dialog
	browser.tabs.onActivated.addListener(initiateCookie);
	browser.webNavigation.onCommitted.addListener(initiateCookie);
}

main();

>>>>>>> master
