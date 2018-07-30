/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

//UNCOMMENT THIS SCRIPT TO AUTOMATICALLY DELETE ALL EUCONSENT COOKIES

/*browser.cookies.onChanged.addListener(function(changeInfo) 
		{
			function allb(cookies)
					{
						//console.log(cookies);
						if (cookies.length != 0) {
						console.log("STANDARD GVCC REMOVED");
						}
					}
					function removeCookies(tabs)
					{
					function didit(){
					}
					var allc = browser.cookies.getAll({
						name:"euconsent"
					});
					var cookierem = browser.cookies.remove({
						//Works on one site. Still have to figure out domain issues.
						url: tabs[0].url,
						name: "euconsent"
					});
					allc.then(allb);
					cookierem.then();
					}
					var getActive = browser.tabs.query({
					active: true,
					currentWindow: true
					});
					getActive.then(removeCookies);
		});*/