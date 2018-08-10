/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/ 	var i = 0;
	function decideRem(cookie)
	{
		if (cookie != undefined) 
		{
			removeGVCC(cookie);
		}
		else
		{
			console.log("Cookie has been deleted automatically (This is a very good thing)");
		}
	}
	function checkGVCC(isRemove)
	{
		function sendGVCC(tabs)
		{
			var gettingto = browser.cookies.getAll
			({
				name:"euconsent"
			});
			gettingto.then(decideRem);
		}
		var getActive = browser.tabs.query
		({
			active: true,
			currentWindow: true
		})
		getActive.then(sendGVCC);
	}
	function onRemoved() 
	{
		console.log("Removed!");
		checkGVCC();
	}
	function onError(error) 
	{
		console.error(error);
	}
	function initiateRemoval()
	{
		function success()
		{
			console.log("Done!");
		}					
		function whynot(error)
		{
			console.log(error);
		}
		function removeCookies(tabs)
		{
			coneole.log("Marker 2");
			var cookierem = browser.cookies.remove
			({
				url: tabs[0].url,
				name: "euconsent"
			});
			cookierem.then(success, whynot);						
		}	
		console.log("Marker 1");
		var getActive = browser.tabs.query
		({
			active: true,
			currentWindow: true
		});
		getActive.then(removeCookies);
	}
    browser.runtime.onMessage.addListener(initiateRemoval);
	function check(cookie)
	{
		if (cookie.name == "euconsent")
		{
			console.log("Found one!");
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
					}
					if (cookiein != "BOSCllVOSCllVABABBENBZAAAAAfaAAA")
					{
					console.log("marker 0.5");
					browser.tabs.executeScript
					({
						file: "write-cookie.js"
					});
					}
					else
					{
						console.log("Nothing I can do here, captain!");
					}
				}
		}
	}
	browser.cookies.onChanged.addListener(function(changeInfo) 
		{
			check(changeInfo.cookie);
		});
		console.log("ok!");