/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

document.addEventListener("click", (e) => {
	/*Function used to log all cookie 
	values to console (for now)*/
	function logCookies(cookies) {
	console.log(cookies);
    for (let cookie of cookies) {
    console.log(cookie.name + ": " + cookie.value);
    }
    }
	/*Function that will clear all 
	cookies with a for loop? (maybe soon)*/
	function rewriteCookieValues(cookies) {
	var i = 1;
	for (let cookie of cookies){
	console.log(cookie);
	console.log(cookie.value);
	cookie.name = cookie.name + " " + i;
	cookie.value = "HI! I'M A COOKIE!"
	console.log(cookie.name + ": " + cookie.value);
	i++;
	}
	}
    var getting = browser.cookies.getAll({});
	/*Function is called based on button pressed*/
	if (e.target.classList.contains("clear")) {
	getting.then(rewriteCookieValues)
	}
    else if (e.target.classList.contains("log")) {
	getting.then(logCookies);
    }
    });
	
	/***The graveyard. Code that I no longer use but may have use for later***/
	/*Saved for later
	console.log(cookie.name);
	var cname cookie.name;
	var removing = browser.cookies.remove({
	name: cname
	});
	removing.then(onRemoved, onError);
	*/
	/*Ideas from user672118 and paxdiablo at Stack Overflow**/
	/**https://stackoverflow.com/questions/5688491/unable-to-delete-cookie-from-javascript**/
	/*
		console.log(cookies);
	for (let cookie of cookies) {
	console.log(cookie.name);
	//cookie = cookie.name + '=; Max-Age=-99999999;';
	console.log(cookie);
	deleteCookie(cookie.name);
    }
	*/