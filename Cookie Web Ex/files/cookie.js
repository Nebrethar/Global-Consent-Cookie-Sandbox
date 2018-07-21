/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

document.addEventListener("click", (e) => {
	/*In the case a cookie is removed*/
	function onRemoved(cookie) {
		console.log(`Removed: ${cookie}`);
	}
	/*In the case a cookie cannot be removed*/
	function onError(error) {
		console.log(`Error removing cookie: ${error}`);
	}
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
	function clearCookies(cookies) {
		console.log(cookies);
	/****This is something I tried, using what I had above.
	When "cookie" is logged it returnes all values of the cookie, as expected.
	"cookie.name" returns only the value of the cookie.
	It seems like I have valid values****/
	for (let cookie of cookies) {
	console.log(cookie);
	console.log(cookie.name);
	/*I can't seem to get this call to remove cookies by the name string.*/
	removing = browser.cookies.remove({
		name: cookie.name
	});
	/*This console.log does not seem to report*/
	console.log(removing);
	removing.then(onRemoved, onError);
    }
	}
    var getting = browser.cookies.getAll({});
	/*Function is called based on button pressed*/
	if (e.target.classList.contains("clear")) {
	getting.then(clearCookies)
	}
    else if (e.target.classList.contains("log")) {
	getting.then(logCookies);
    }
    });