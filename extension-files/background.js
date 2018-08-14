/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/
	savedOldVal = "";
	firstTime = true;
	sendOutValue = "";
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
		}					
		function whynot(error)
		{
			console.log(error);
		}
		function removeCookies(tabs)
		{
			//consent string will eventually be injected here
			concatenation = "BOSCllVOSCllVABABBENBZAAAAAfaAAA" + "-" + sendOutValue;
			//console.log(concatenation);
				var finalset = browser.cookies.set
				({
					url: tabs[0].url,
					name:"euconsent",
					value: concatenation
				})
			var cookierem = browser.cookies.remove
			({
				url: tabs[0].url,
				name: "euconsent"
			});
			cookierem.then(success, whynot);
			finalset.then(fsuccess, whynot);
		}	
		var getActive = browser.tabs.query
		({
			active: true,
			currentWindow: true
		});
		getActive.then(removeCookies);
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
					if (cookiein != "BOSCllVOSCllVABABBENBZAAAAAfaAAA")
					{
						if (firstTime)
						{
						savedOldVal = cookiein;
						firstTime = false;
						initiateRemoval();
						}
						else if (!firstTime && cookiein.length >= 4 && cookiein != savedOldVal)
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
	