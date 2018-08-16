/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

document.addEventListener("click", (e) =>
{
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
	/*click "CLEAR COOKIES" WILL CLEAR ALL YOUR COOKIES*/
	if (e.target.classList.contains("clear")) 
	{
		browser.browsingData.removeCookies({}).then(onRemoved, onError);
	}
	if (e.target.classList.contains("generate")) 
	{
		browser.tabs.executeScript
		({
			file: "consent-string-packed/consent.js", 
		});
	}
});