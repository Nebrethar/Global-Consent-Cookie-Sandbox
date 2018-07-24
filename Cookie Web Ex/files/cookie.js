/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

document.addEventListener("click", (e) => {
		var getting;
		var gettingaFew;
		function rewriteCookieValues(cookies) {
			var i = 1;
			if (cookies === undefined || cookies.length == 0) {
				console.log("No cookies found!");
			}
			else
			{
				for (let cookie of cookies){
					var ht = document.getElementById("which").value;
					//console.log(ht);
					//console.log(cookie.value);
					//var oldName = cookie.name;
					cookie.name = i+ " " + cookie.name + " ";
					cookie.value = ht;
					console.log(cookie.name + ": " + cookie.value);
					//console.log(cookie);
					i++;
				}
			}
		}
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
					console.log(j + " " + cookie.name + " : " + cookie.value + "\n");
					j++
				}
			}
		}
		function onRemoved() {
			console.log("Removed!");
		}
		function onError(error) {
			console.error(error);
		}
		if (e.target.classList.contains("mod")) 
		{
			getting = browser.cookies.getAll({});
			getting.then(rewriteCookieValues)
		}
		else if (e.target.classList.contains("log")) 
		{
			getting = browser.cookies.getAll({});
			getting.then(logCookies);
		}
		else if (e.target.classList.contains("specific")) 
		{
			var who = document.getElementById("who").value;
			gettingaFew = browser.cookies.getAll({name:who});
			gettingaFew.then(rewriteCookieValues);
		}
		else if (e.target.classList.contains("clear")) 
		{
			browser.browsingData.removeCookies({}).
			then(onRemoved, onError);
		}

	});