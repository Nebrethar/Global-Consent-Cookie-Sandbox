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
		}
		/*
		NAME: addGVCC
		PURPOSE: Creates a new GVCC and adds it to the browser
		*/
		function addGVCC(tabs)
		{
			//this seems to work pretty well for every website
			domain = tabs[0].url.split('/')[2];
				var cookieset = browser.cookies.set
				({
					url: tabs[0].url,
					name: "euconsent",
					value: "BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA",
					httpOnly: false,
					//temporary
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
	