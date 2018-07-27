/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

document.addEventListener("click", (e) => {
		function consentCookies(cookies) 
		{
			browser.tabs.executeScript({
			file: "write-cookie.js"
			});
		}
		//These functions are for when cookies are cleared (see bottom)
		function onRemoved() {
			console.log("Removed!");
		}
		function onError(error) {
			console.error(error);
		}
		/*Logs all cookies to console. Shows all cookie data,
		as compared to how document.cookie in file write-cookie.js
		shows just name=value*/
		function logCookies(cookies) 
		{
			if (cookies === undefined || cookies.length == 0) {
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
		function test(cookie)
		{
		function setCookie(tabs) {
			console.log(cookie);
			cookie.value = "00000000000000000000000000000000000";
			console.log(cookie);
			console.log(cookie.name);
			var cookieset = broswser.cookies.set({
				url: tabs[0].url,
				name: cookie.name,
				value: cookie.value,
				domain: cookie.domain,
				httpOnly: cookie.httpOnly,
				expirationDate: cookie.expirationDate,
				url:cookie.url,
				storeId:cookie.storeId,
				secure:cookie.secure,
				path:cookie.path});
				cookieset.then(onError);
		}
			
			var getActive = browser.tabs.query({active: true, currentWindow: true});
			getActive.then(setCookie);
			
		}
		//To be used later. This is for valigation and cookie modification.
		//*******browser.webNavigation.onBeforeNavigate.addListener(logCookies);
		
		/*click "LOG COOKIES"*/
		if (e.target.classList.contains("log")) 
		{
			var getting = browser.cookies.getAll({});
			getting.then(logCookies);
		}
		/*click "CONSENT COOKIES"*/
		if (e.target.classList.contains("consent")) 
		{
			consentCookies();
		}
		/*click "CLEAR COOKIES" WILL CLEAR ALL YOUR COOKIES*/
		if (e.target.classList.contains("consent2")) 
		{
			
		function go(tabs){
			var gettingto = browser.cookies.get({
				name:"euconsent",
				url: tabs[0].url
			});
			gettingto.then(test);
		}
			var getActive = browser.tabs.query({
			active: true,
			currentWindow: true
			});
			getActive.then(go);
		}
		else if (e.target.classList.contains("clear")) 
		{
			browser.browsingData.removeCookies({}).
			then(onRemoved, onError);
		}

	});