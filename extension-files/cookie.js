"use strict";

async function logCookies(currentDomain) {
    let tabs = await browser.tabs.query({active: true, currentWindow: true});
    let cookies = null;
    if (currentDomain == true) {
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

let actions = {
    logAll() {
        logCookies(false);
    },

    log() {
        logCookies(true);
    },

    consent2() {
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

        console.log("ALL DOMAINS FOR GENERATED CONSENT COOKIES");
        addName("euconsent");
        addName("cepubsonsent");
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
        addName("cc");
        addName("displayCookieConsent");
        addName("cookie-agreed");
    },

    /* click "CLEAR COOKIES" WILL CLEAR ALL YOUR COOKIES */
    async clear() {
        try {
            await browser.browsingData.removeCookies({});
            console.log("Removed!");
        } catch (error) {
            console.error(error);
        }
    },

    async preload() {
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
        setCookie("cookieConsent", "was-set", ".www.investing.com", "https://www.investing.com/");
        setCookie("_gat", "1", ".www.index.hr", "https://www.index.hr/");
        setCookie("cookies_notice", "1", ".www.thejournal.ie", "http://www.thejournal.ie/");
        setCookie("GU_TK", "1.1534544181584", ".theguardian.com", "https://www.theguardian.com");
        setCookie("GU_TK", "1.1534544181584", ".theguardian.com", "https://www.theguardian.com");
        setCookie("euconsent", "BOSl-jdOSl-jlABABBENBd-AAAAgV___________" +
        "____________________________________________________" +
        "_______________________A", ".www.meneame.net", "https://www.meneame.net/");
        setCookie("epubconsent", "BOS9DEaOS9DEaAKAHAENAAAA-AAAAA", ".www.meneame.net", "https://www.meneame.net/");
        setCookie("displayCookieConsent", "n", "www.meneame.net", "https://www.meneame.net/");
    },

    async snapshot() {
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
    },
};

// Save a snapshot of cookies to compare to.
let snapshot = [];

document.addEventListener("click", (e) => {
    actions[e.target.id]();
});
