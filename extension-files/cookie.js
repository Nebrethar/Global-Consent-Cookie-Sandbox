/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

document.addEventListener("click", (e) => {
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
		}
		//To be used later. This is for valigation and cookie modification.
		//*******browser.webNavigation.onBeforeNavigate.addListener(logCookies);
		
		/*click "LOG COOKIES"*/
		if (e.target.classList.contains("log")) 
		{
			var getting = browser.cookies.getAll({});
			getting.then(logCookies);
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
			}
			function again()
			{
			var gettingagain = browser.cookies.getAll({
				name:"euconsent"
			});
			gettingagain.then(removeGVCC);
			}
			function removeGVCC(cookies)
			{
				if (cookies === undefined || cookies.length == 0) {
				console.log("No GVCC found!");
			}
			else
			{
				browser.tabs.executeScript({
					file: "write-cookie.js"});	
					function didit(){
					console.log("Overwritten!");
					}					
					function whynot(error){
					console.log(error);
					}
					for (let cookie of cookies)
					{
						//ex BORuR6lORuR6lAKACBENBY-AAAAfRxNACIgCAoKwQMgBAgACAACAGCAAQAAAAgIAAAAAAAABCAAAAAAAQQEAAQACCAAAAAAAAAAAAAAAAAAAAAAAAA
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
					if (cookiein != "BORxCNvORxCNvABABBENBZAAAAAfaAAA")
					{
					function removeCookies(tabs)
					{
					var cookierem = browser.cookies.remove({
						//Works on one site. Still have to figure out domain issues.
						url: tabs[0].url,
						name: "euconsent"
						});
					cookierem.then(didit, whynot);
					}
					}
					var getActive = browser.tabs.query({
					active: true,
					currentWindow: true
					});
					getActive.then(removeCookies);
					}
			}
			again();
			again();
			}
			
		});