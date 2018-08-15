/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

//consent cookie for New York Times is NYT-T and default value after providing consent is "ok"
//consent cookie for emerse.com is called emerse-consent and values are "1" and "0"
	var savedOldVal = "";
	var firstTime = true;
	var sendOutValue = "";
	var domain;
	var expirationDate;
	var firstPartyDomain;
	var httpOnly;
	var path;
	var secure;
	var storeID;
	listen = function()
	{
	browser.cookies.onChanged.addListener(change);
	}
	function onError(error) 
	{
		console.error(error);
	}
	function initiateRemoval()
	{
		function fsuccess()
		{
			console.log("Cookie has been rewritten");
			setTimeout(listen, 500);
		}
		function success()
		{
			browser.cookies.onChanged.removeListener(change);
			console.log("Removed!");
		}					
		function whynot(error)
		{
			console.log(error);
		}
		function removeCookies(tabs)
		{
			//consent string will eventually be injected here
			concatenation = "BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA";// + "-" + sendOutValue;
			//console.log(concatenation);
			
			var cookierem = browser.cookies.remove
			({
				url: tabs[0].url,
				name: "euconsent"
			});
			cookierem.then(success, whynot);
		}
		function addGVCC(tabs)
		{
		console.log(domain);
				var finalset = browser.cookies.set
				({
					url: tabs[0].url,
					name:"euconsent",
					value: concatenation,
					httpOnly: httpOnly,
					expirationDate: expirationDate,
					path: path,
					firstPartyDomain: firstPartyDomain,
					domain: domain
				})	
			finalset.then(fsuccess, whynot);
		}
		var getActive = browser.tabs.query
		({
			active: true,
			currentWindow: true
		});
		getActive.then(removeCookies);
		getActive.then(addGVCC);
	}
	function check(cookie)
	{
		if (cookie.name == "euconsent")
		{
				var cookieValue = cookie.value.split('-');
				var cookiein = "";
				var cookieout;
				for (var i=0;i<cookieValue.length;i++)
				{
					if (i < cookieValue.length - 2)
					{
						cookiein = cookiein + cookieValue[i] + "-";
					}
					else if (i < cookieValue.length - 1)
					{
						cookiein = cookiein + cookieValue[i];
					}
					else
					{
						cookieout = cookieValue[i];
						sendOutValue = cookieValue[i];
					}
					//BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA for no consent
					// for clean slate BOSCllVOSCllVABABBENBZAAAAAfaAAA
					if (cookiein != "BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA")
					{
						console.log(cookie);
						domain = cookie.domain;
						expirationDate = cookie.expirationDate;
						firstPartyDomain = cookie.firstPartyDomain;
						httpOnly = cookie.httpOnly;
						path = cookie.path;
						secure = cookie.secure;
						storeID = cookie.storeID;
						if (firstTime)
						{
						savedOldVal = cookiein;
						firstTime = false;
						initiateRemoval()
						}
						else if (cookiein.length > 5)
						{
							initiateRemoval();
						}
					}
				}
		}
	}
	change = function(changeInfo) 
		{
			check(changeInfo.cookie);
		};
	browser.cookies.onChanged.addListener(change);
	