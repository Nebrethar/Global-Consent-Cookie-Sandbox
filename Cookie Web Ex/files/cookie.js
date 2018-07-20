document.addEventListener("click", (e) => {
	
	function logCookies(cookies) {
	console.log(cookies);
    for (let cookie of cookies) {
    console.log(cookie.value);
    }
    }
    var getting = browser.cookies.getAll({});
    getting.then(logCookies);
    });