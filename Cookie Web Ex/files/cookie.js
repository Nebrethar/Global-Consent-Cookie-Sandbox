/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

document.addEventListener("click", (e) => {
			function onRemoved(cookie) {
			console.log(`Removed: ${cookie}`);
		}

		function onError(error) {
			console.log(`Error removing cookie: ${error}`);
		}
	function logCookies(cookies) {
	console.log(cookies);
    for (let cookie of cookies) {
    console.log(cookie.value);
    }
    }
	function clearCookies(cookies) {
		console.log(cookies);
	for (let cookie of cookies) {
	console.log(cookie);
	console.log(cookie.name);
	removing = browser.cookies.remove({
		name: cookie.name
	});
	console.log('removing');
	removing.then(onRemoved, onError);
    }
	}
    var getting = browser.cookies.getAll({});
	if (e.target.classList.contains("clear")) {
	getting.then(clearCookies)
	}
    else if (e.target.classList.contains("log")) {
	getting.then(logCookies);
    }
    });