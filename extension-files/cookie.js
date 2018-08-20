document.addEventListener("click", async (event) => {
	async function preloadCookies() {
    let nameSet = "euconsent";
    let valueSet = "BOSl-jdOSl-jlABABBENBd-AAAAgV___________" +
            "___________________________________________" +
            "________________________________A";
    let httpOnlySet = false;
    let pathSet = "/";
    let firstPartyDomainSet = "";
    let storeIdSet = "firefox-default";
    let domainSet = "";
	let urlSet = "";
    async function setCookie() {
        await browser.cookies.set({
            url: urlSet,
            name: nameSet,
            value: valueSet,
            httpOnly: httpOnlySet,
            path: pathSet,
            firstPartyDomain: firstPartyDomainSet,
            storeId: storeIdSet,
            domain: domainSet,
            secure: false,
            expirationDate: 1566099891,
        });
    }
	console.log("set cookieConsent for www.investing.com");
		nameSet = "cookieConsent";
		valueSet = "was-set";
		domainSet = ".www.investing.com"
		urlSet = "https://www.investing.com/";
		setCookie();
	console.log("set _gat for www.index.hr");
		nameSet = "_gat";
		valueSet = "1";
		domainSet = ".www.index.hr"
		urlSet = "https://www.index.hr/"
		setCookie();
	console.log("set cookies_notice for .www.thejournal.ie");
		nameSet = "cookies_notice";
		valueSet = "1";
		domainSet = ".www.thejournal.ie"
		urlSet = "http://www.thejournal.ie/"
		setCookie();
}
    async function logCookies() {
		let tabs = await browser.tabs.query({active: true, currentWindow: true});
		let cookies = await browser.cookies.getAll({url:tabs[0].url});
        if (cookies === undefined || cookies.length == 0) {
            console.log("No cookies found!");
        } else {
            let j = 1;
            for (let cookie of cookies) {
                // console.log(cookie);
                console.log("#" + j);
                    console.log(cookie);
                    j++;
                }
        }
    }
    if (event.target.classList.contains("log")) {
        logCookies();
    }
    if (event.target.classList.contains("consent2")) {
        console.log("ALL DOMAINS FOR GENERATED CONSENT COOKIES");
        async function addName(name) {
            let cookies = await browser.cookies.getAll({name: name});
                        if (name === "ckns_policy_exp") {
                console.log("Next four cookies are BBC SPECIFIC");
            }
              if (cookies === undefined || cookies.length == 0) {
                 console.log(name + " not present.");
             } else {
                console.log("***********FOUND: " + name);
                 for (let cookie of cookies) {
                     console.log(cookie.domain);
                 }
            }
        }
        addName("euconsent");
        addName("banner-cookie");
        addName("GU_TK");
        addName("ckns_policy_exp");
        addName("ckns_policy");
        addName("ckns_privacy");
        addName("ckns_explicit");
        addName("cookie_notice_accepted");
        addName("cookie-law-bar");
        addName("NYT-T");
		addName("lopd");
		addName("_iph_pcb");
		addName("consentSaw");
		addName("_gat");
		addName("cookieConsent");
		addName("cookies_notice");
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

     if (event.target.classList.contains("preload")) {
         preloadCookies();
     }
 });
