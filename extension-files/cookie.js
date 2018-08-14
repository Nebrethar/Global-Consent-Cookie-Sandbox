/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

document.addEventListener("click", (e) =>
{
	browser.runtime.onMessage.addListener(initiateRemoval);
	var writtenConsent = false;
	function onRemoved() 
	{
		console.log("Removed!");
	}
	function onError(error) 
	{
		console.error(error);
	}
	function modifyCookies()
	{
		var gettingagain = browser.cookies.getAll
		({
			name:"euconsent"
		});
		gettingagain.then(removeGVCC);
	}
	function initiateRemoval()
	{
		function success()
		{
			/*This is a workaround to the cookie only being removed most of the time,
			with a reliable removal 99% of the time on second try.
			If the cookie is still present before writing, it will try again, and again.
			For 1.5 seconds on the timer. This is plenty of time to get it done almost all of the time for now.*/
			checkGVCC(true);
		}					
		function whynot(error)
		{
			console.log(error);
		}
		function removeCookies(tabs)
		{
			var cookierem = browser.cookies.remove
			({
				url: tabs[0].url,
				name: "euconsent"
			});
			cookierem.then(success, whynot);						
		}						
		var getActive = browser.tabs.query
		({
			active: true,
			currentWindow: true
		});
		getActive.then(removeCookies);
	}
	function removeGVCC(cookies)
	{
		browser.runtime.onMessage.addListener(initiateRemoval);
		if (cookies === undefined || cookies.length == 0) 
		{
			console.log("No GVCC found!");
		}		
		else
		{	
			for (let cookie of cookies)
			{
				var cookieValue = cookie.value.split('-');
				//console.log(cookieValue);
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
				}
				//console.log("cookiein: " + cookiein);
				//console.log("cookieout: " + cookieout);
				if (cookiein != "BOSCllVOSCllVABABBENBZAAAAAfaAAA")
				{
					browser.tabs.executeScript
					({
						file: "write-cookie.js"
					});
					checkGVCC(false);
				}
				else
				{
					console.log("Nothing I can do here, captain! But here's the modified GVCC.");
					checkGVCC(false);
					writtenConsent = true;
				}
			}
		}
	}
	/*Logs all cookies to console. Shows all cookie data,
	as compared to how document.cookie in file write-cookie.js
	shows just name=value*/
	function logGVCC(cookies)
	{
		if (cookies === undefined || cookies.length == 0) 
		{
			console.log("I have not found what you are looking for.");
		}
		else
		{
			for (let cookie of cookies) 
				{
					console.log(cookie);
				}
		}
	}
	function decideRem(cookies)
	{
		if (cookies === undefined || cookies.length == 0) 
		{
			console.log("Cookie has been deleted (This is a good thing)");
		}
		else
		{
			removeGVCC(cookies);
		}
	}
	function logCookies(cookies) 
	{
		if (cookies === undefined || cookies.length == 0) 
		{
			console.log("No cookies found!");
		}
		else
		{
			var j = 1;
			for (let cookie of cookies) 
				{
				//console.log(cookie);
				console.log("#" + j);
					console.log(cookie);
					j++;
				}
		}
	}
	/*click "LOG COOKIES"*/
	if (e.target.classList.contains("log")) 
	{
		var getting = browser.cookies.getAll({});
		getting.then(logCookies);
	}
	function checkGVCC(isRemove)
	{
		function sendGVCC(tabs)
		{
			var gettingto = browser.cookies.getAll
			({
				name:"euconsent"
			});
			if (isRemove)
			{
				gettingto.then(decideRem);
			}
			else
			{
				gettingto.then(logGVCC);
			}
		}
		var getActive = browser.tabs.query
		({
			active: true,
			currentWindow: true
		})
		getActive.then(sendGVCC);
	}
	if (e.target.classList.contains("consent2"))			
	{
		checkGVCC(false);
	}
	/*click "CLEAR COOKIES" WILL CLEAR ALL YOUR COOKIES*/
	if (e.target.classList.contains("clear")) 
	{
		browser.browsingData.removeCookies({}).then(onRemoved, onError);
	}
	if (e.target.classList.contains("remove")) 
	{
		modifyCookies();
	}
	if (e.target.classList.contains("generate")) 
	{
		browser.tabs.executeScript
		({
			file: "consent-string-packed/consent.js"
		});
	}
});