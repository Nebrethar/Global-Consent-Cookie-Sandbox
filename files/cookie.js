/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

document.addEventListener("click", (e) => {
		function consentCookies(cookie) 
		{
		function go()
		{
		function scrip(){
			browser.tabs.executeScript({
			file: "write-cookie.js"
			});
		}
			scrip();
		function del(cookie){
		var cookierem = browser.cookies.remove({
			url: tabs[0].url,
			name: "euconsent"
		});
			cookierem.then(    () => {
        console.log('Removed!');
			}
		).catch(
		(aReason) => {
        console.log('Failed to remove cookie', aReason);
			}
		);
		//del(cookie);

		}
		}
		var getActive = browser.tabs.query({
			active: true,
			currentWindow: true
			});
		getActive.then(go);

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
		function test(cookies){
			for (let cookie of cookies) 
				{
			console.log(cookie);
				}
			var cookieset = browser.cookies.set({
				name: cookie.name,
				value: "00000000000000000000000000000000000",
				domain: cookie.domain,
				httpOnly: cookie.httpOnly,
				expirationDate: cookie.expirationDate,
				url:cookie.url,
				storeId:cookie.storeId,
				secure:cookie.secure,
				path:cookie.path});
				console.log("STEP 1");
			var cookierem = browser.cookies.remove({
				url: cookie.url,
				name: cookie.name});
			console.log(cookie);
			console.log(cookie.name);
			cookierem.then(    () => {
        console.log('Removed!');
			}
		).catch(
		(aReason) => {
        console.log('Failed to remove cookie', aReason);
			}
		);
		var gettingto = browser.cookies.get({
				name:"euconsent",
				url: cookie.url
			});
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
			function go(tabs){
			var gettingto = browser.cookies.get({
				name:"euconsent",
				url: tabs[0].url
			});
			gettingto.then(consentCookies);
		}
			var getActive = browser.tabs.query({
			active: true,
			currentWindow: true
			});
			getActive.then(go);
		}
		/*click "CLEAR COOKIES" WILL CLEAR ALL YOUR COOKIES*/
		if (e.target.classList.contains("consent2"))			
		{
		function go(tabs){
			var gettingto = browser.cookies.getAll({
				name:"euconsent"
			});
			gettingto.then(test);
		}
			var getActive = browser.tabs.query({
			active: true,
			currentWindow: true
			});
			getActive.then(go);
		}
		if (e.target.classList.contains("clear")) 
		{
			browser.browsingData.removeCookies({}).then(onRemoved, onError);
		}
		if (e.target.classList.contains("remove")) 
		{
			function again()
			{
			var gettingagain = browser.cookies.getAll({
				name:"euconsent",
			});
			gettingagain.then(removeGVCC);
			}
			function removeGVCC(cookies)
			{
									scrip();
				function didit(){
					console.log("DID IT");
					}
					function whynot(error){
					console.log(error);
					}
							function scrip(){
					browser.tabs.executeScript({
					file: "write-cookie.js"
					});
					}
					for (let cookie of cookies)
					{
					if (cookie.value != "00000000000000000000000000000000000")
					{
					var cookierem = browser.cookies.remove({
						//Works on one site. Still have to figure out domain issues.
						url: "https://www.independent.co.uk/us?CMP=ILC-refresh",
						name: "euconsent"
						});
					
					cookierem.then(didit, whynot);
					}
					else
					{
					console.log("****************OVERWRITTEN COOKIE FOUND****************");
					}
					}
			}
			again();
		}
});