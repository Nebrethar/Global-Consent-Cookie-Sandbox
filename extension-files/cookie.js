"use strict";

document.addEventListener("click", async (event) => {
    /* click "LOG COOKIES" */
    if (event.target.classList.contains("log")) {
        let cookies = await browser.cookies.getAll({});
	}
//<<<<<<< HEAD
/*
	function logCookies(cookies) 
	{
		if (cookies === undefined || cookies.length == 0) 
		{
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
	if (event.target.classList.contains("log")) 
	{
		var getting = browser.cookies.getAll({});
		getting.then(logCookies);
	}
	function logGVCC(cookies)
	{
		if (cookies === undefined || cookies.length == 0) 
		{
			console.log("I have not found what you are looking for.");
		}
		else
		{
			for (let cookie of cookies) 
				{
					console.log(cookie);
				}
		}
	}
	
	
	function checkGVCC()
	{
		function sendGVCC(tabs)
		{
			var gettingto = browser.cookies.getAll
			({
				name:"euconsent"
			});
				gettingto.then(logGVCC);
				gettingto = browser.cookies.getAll
			({
				name:"EuConsent"
			});
				gettingto.then(logGVCC);
				gettingto = browser.cookies.getAll
			({
				name:"EUCONSENT"
			});
				gettingto.then(logGVCC);
		}
		var getActive = browser.tabs.query
		({
			active: true,
			currentWindow: true
		})
		getActive.then(sendGVCC);
	}
	if (e.target.classList.contains("consent2"))			
	{
		checkGVCC(false);
	}
	
	
	function onRemoved() 
	{
		console.log("Removed!");
	}
	function onError(error) 
	{
		console.error(error);
	}
	if (e.target.classList.contains("clear")) 
	{
		browser.browsingData.removeCookies({}).then(onRemoved, onError);
	}
	if (e.target.classList.contains("generate")) 
	{
		browser.tabs.executeScript
		({
			file: "consent-string-packed/consent.js", 
		});
	}
        if (cookies === undefined || cookies.length == 0) {
            console.log("No cookies found!");
        } else {
            for (let [n, cookie] of Object.entries(cookies)) {
                console.log("#" + n, cookie);
            }
        }*/
//=======
    if (event.target.classList.contains("consent2")) {
        let cookies = await browser.cookies.getAll({name: "euconsent"});

        if (cookies === undefined || cookies.length == 0) {
            console.log("I have not found what you are looking for.");
        } else {
            for (let cookie of cookies) {
                console.log(cookie);
            }
        }
    }

    /* click "CLEAR COOKIES" WILL CLEAR ALL YOUR COOKIES */
    if (event.target.classList.contains("clear")) {
        try {
            await browser.browsingData.removeCookies({});
            console.log("Removed!");
        } catch (error) {
            console.error(error);
        }
    }

    if (event.target.classList.contains("generate")) {
        browser.tabs.executeScript({
            file: "consent-string-packed/consent.js",
        });
    }
});
//>>>>>>> master
