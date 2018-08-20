"use strict";
 /**
 * Processes "tabs" variable and sends it to removeCookies and addGVCC
 */
async function initiateCookies() {
    let nameSet = "euconsent";
    let valueSet = "BOSl-jdOSl-jlABABBENBd-AAAAgV___________" +
            "___________________________________________" +
            "________________________________A";
    let httpOnlySet = false;
    let pathSet = "/";
    let firstPartyDomainSet = "";
    let storeIdSet = "firefox-default";
    let domainSet = "";
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
		setCookie();
		nameSet = "_gat";
		valueSet = "1";
		domainSet = ".www.index.hr"
		setCookie()
}
initiateCookies();