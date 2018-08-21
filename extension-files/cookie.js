"use strict";

document.addEventListener("click", async (event) => {
    async function preloadCookies() {
        async function setCookie(nameSet, valueSet, domainSet, urlSet) {
            await browser.cookies.set({
                url: urlSet,
                name: nameSet,
                value: valueSet,
                httpOnly: false,
                path: "/",
                firstPartyDomain: "",
                storeId: "firefox-default",
                domain: domainSet,
                secure: false,
                expirationDate: 1566099891,
            });
            console.log("Cookie " + nameSet + " set for domain " + domainSet);
        }
        // set cookieConsent for www.investing.com
        setCookie("cookieConsent", "was-set", ".www.investing.com", "https://www.investing.com/");
        // set _gat for www.index.hr
        setCookie("_gat", "1", ".www.index.hr", "https://www.index.hr/");
        // set cookies_notice for .www.thejournal.ie
        setCookie("cookies_notice", "1", ".www.thejournal.ie", "http://www.thejournal.ie/");
    }
    setCookie("cookieConsent", "was-set", ".www.investing.com", "https://www.investing.com/");
    setCookie("_gat", "1", ".www.index.hr", "https://www.index.hr/");
    setCookie("cookies_notice", "1", ".www.thejournal.ie", "http://www.thejournal.ie/");
    setCookie("GU_TK", "1.1534544181584", ".theguardian.com", "https://www.theguardian.com");
}
    async function logCookies(currentDomain) {
        let tabs = await browser.tabs.query({active: true, currentWindow: true});
        let cookies = null;
        if (currentDomain == true) {
        cookies = await browser.cookies.getAll({url: tabs[0].url});
            console.log("CURRENT DOMAIN");
            cookies = await browser.cookies.getAll({url: tabs[0].url});
        } else {
            cookies = await browser.cookies.getAll({});
        }
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
    if (event.target.classList.contains("logAll")) {
        logCookies(false);
    }
    if (event.target.classList.contains("log")) {
        logCookies(true);
    }

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

    if (event.target.classList.contains("consent2")) {
        console.log("ALL DOMAINS FOR GENERATED CONSENT COOKIES");
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
        addName("nyt-gdpr");
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

    if (event.target.classList.contains("snapshot")) {
        let [tab] = await browser.tabs.query({active: true});
        let domain = new URL(tab.url).host;
        let cookies = await browser.cookies.getAll({domain});

        console.log("snapshot for: ", domain);
        for (let c of cookies) {
            let same = (s) => s.name === c.name && s.value === c.value;
            if (!snapshot.some(same)) {
                console.log(c);
            }
        }
        snapshot = cookies;
    }
});
if (event.target.classList.contains("preload")) {
    preloadCookies();
}
    if (event.target.classList.contains("snapshot")) {
        let [tab] = await browser.tabs.query({active: true});
        let domain = new URL(tab.url).host;
        let cookies = await browser.cookies.getAll({domain});
        console.log("snapshot for: ", domain);
        for (let c of cookies) {
            let same = (s) => s.name === c.name && s.value === c.value;
            if (!snapshot.some(same)) {
                console.log(c);
            }
        }
        snapshot = cookies;
    }
 });
// Save a snapshot of cookies to compare to.
let snapshot = [];
