/*
Information on API used can be found at Mozilla WebExtensions documentation
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/cookies 
*/

document.addEventListener("click", (e) => {
	function rewriteCookieValues(cookies) {
	var i = 1;
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
	function logCookies(cookies) {
	var j = 1;
    for (let cookie of cookies) {
	//console.log(cookie);
    console.log(j + " " + cookie.name + " : " + cookie.value + "\n");
	j++
    }
    }
	var getting;
	var GettingaFew;
	if (e.target.classList.contains("mod")) {
	getting = browser.cookies.getAll({});
	getting.then(rewriteCookieValues)
	}
    else if (e.target.classList.contains("log")) {
	getting = browser.cookies.getAll({});
	getting.then(logCookies);
    }
	else if (e.target.classList.contains("specific")) {
	var who = document.getElementById("who").value;
	gettingaFew = browser.cookies.getAll({name:who});
	gettingaFew.then(rewriteCookieValues);
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