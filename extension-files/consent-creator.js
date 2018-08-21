"use strict";
 /**
 * Processes "tabs" variable and sends it to removeCookies and addGVCC
 */
async function initiateCookie() {
    let tabs = await browser.tabs.query({active: true, currentWindow: true});
    let domain = tabs[0].url.split("/")[2];
    browser.webNavigation.onCommitted.removeListener(initiateCookie);
    // The default values here indicate the default settings
    // for a consent cookie with all vendors allowed.
    let urlSet = tabs[0].url;
    let nameSet = "euconsent";
    let valueSet = "BOSl-jdOSl-jlABABBENBd-AAAAgV___________" +
            "___________________________________________" +
            "________________________________A";
    let httpOnlySet = false;
    let pathSet = "/";
    let firstPartyDomainSet = "";
    let storeIdSet = "firefox-default";
    /* This is the default domain, and
    it seems to work pretty well for
    half of the time*/
    let domainSet = "." + domain;
    // More of these may be necessary in the future.
    if (domain.startsWith("www.thelocal")) {
        domain = "theLocal";
    }
    if (domain.startsWith("ctxt")) {
        domain = "ctxt";
    }
    // useful  for debugging
    // console.log("DOMAIN: " + domain);
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
    /*
    __________________________________________________________
    Navigating the publisher consent string switch stsatment
    __________________________________________________________
    The above logged value, "Domain to set", is a value that is
    shown to you and entered here to specify a website's domain
    to put a GVCC and other required parameters into the cookie.
    An example switch section would be:
         case "www.independent.co.uk":
            valueSet = "BOEFEAyOEFEAyAHABDENAI4AAAB9vABAASA";
            urlSet = "https://www.independent.co.uk/";
     Most of the values outside the main value stay the same,
    but any of the variables (of course) can be overridden.
    The best thing this can be used for is name changes, as
    there are some mincor capitalization differences that
    eventually warrant this statement.
    Values Include:

    "BOSl-jdOSl-jlABABBENBd-AAAAgV___________" +
    "____________________________________________________" +
    "_______________________A"
    (FULL CONSENT)

    "BOSqLaKOSqLaKABABBENBdAAAAAgWAAA"
    (NO CONSENT)
    __________________________________________________________
    */
    switch (domain) {
        case "www.independent.co.uk": setCookie(); break;
        // Below is for all theLocal domains
        // such as .fr .de
        case "theLocal": setCookie(); break;
        // consented. This website just checks if there is a
        // cookie called "banner-cookie". If one is present,
        // it turns off the wall.
        case "www.politico.eu":
            nameSet = "banner-cookie";
            valueSet = "0";
            setCookie();
            break;
        case "voterspost.com":
            nameSet = "cookie_notice_accepted";
            valueSet = "true";
            domainSet = "voterspost.com";
            setCookie();
            break;
        case "www.bbc.com":
            nameSet = "ckns_policy_exp";
            valueSet = "1566096722751";
            domainSet = ".bbc.com";
            setCookie();
            nameSet = "ckns_explicit";
            valueSet = "1";
            setCookie();
            nameSet = "ckns_privacy";
            valueSet = "1";
            setCookie();
            nameSet = "ckns_policy";
            valueSet = "111";
            setCookie();
            break;
        case "www.euractiv.com":
            nameSet = "cookie-law-bar";
            valueSet = "accept";
            domainSet = "www.euractiv.com";
            setCookie();
            break;
        case "www.nytimes.com":
            nameSet = "NYT-T";
            valueSet = "ok";
            domainSet = ".nytimes.com";
            setCookie();
			nameSet = "nyt-gdpr";
            valueSet = "1";
            domainSet = ".nytimes.com";
            setCookie();
			break;
        case "ctxt":
            nameSet = "lopd";
            valueSet = "true";
            domainSet = "ctxt.es";
            setCookie();
            break;
        /* Experimental forsal support
        case "forsal.pl":
            nameSet = "inforCookieWallGlobalVal";
            valueSet = "15";
            domainSet = "forsal.pl";
            setCookie();
            break;*/
        case "index.hu":
            nameSet = "_iph_pcb";
            valueSet = "1";
            setCookie();
            break;
        case "www.thejournal.ie":
            nameSet = "cookies_notice";
            valueSet = "1";
            setCookie();
            break;
		case "de.reuters.com":
			nameSet = "_evidon_consent_cookie"
			valueSet = "{\"vendors\":{\"3\":[17,51,58,64,80,81,131," +
			"134,168,174,176,190,249,257,274,290,292,313,348,355,395," +
			"443,474,480,506,635,920,934,958,1043,1256,1284,1440,1550," +
			"1879,2449,2516,2521,2609,2645,2918,2941,3009,3373,3490,3561,+ " +
			"3632,3768,3794,3857,3992,4097,4160,4511,4670,4672,5148,5172]}," +
			"\"consent_date\":\"2018-08-21T15:49:17.529Z\"}";
			domainSet = ".reuters.com";
			setCookie();
			/*
        case "www.investing.com":
            nameSet = "cookieConsent";
            valueSet = "was-set";
            setCookie();
            break;
        case "www.index.hr":
            nameSet = "_gat";
            valueSet = "1";
            setCookie()
            break;*/
        /*  This is based on an Opt-Out cookie that
        quantserve provides. I can't seem to get
        the necessary permissions to create the
        cookie.
        case "www.euronews.com":
            domainSet = ".quantserve.com";
            nameSet = "qoo";
            valueSet = "OPT-OUT";
            setCookie();
            break;

        This below causes "permission denied"
        error as well
        case "www.theverge.com":
            nameSet = "_chorus_privacy_consent";
            valueSet = "1534612058274-36c5e1f61527f6ab625612d5e08d5af6";
            domainSet = "auth.voxmedia.com";
            setCookie();
            nameSet = "_chorus_privacy_consent";
            valueSet = "1534612058274-36c5e1f61527f6ab625612d5e08d5af6";
            domainSet = "www.theverge.com";
            setCookie();
            break;*/

        default:
            // do nothing
    }
    // console.log("Setting cookie value: " + valueSet.substr(0,16) + "....");
    // Temporary fix for window issue described below.
    main();
    broswer.webNavigation.onCreatedNavigationTarget.addListener(main);
    browser.tabs.onActivated.addListener(main);
}
// Would like to call this on navigation to a new
// webpage, but cannot find an API for it.
function main() {
    // Listeners for actions that would provoke a dialog
    browser.tabs.onActivated.addListener(initiateCookie);
    browser.webNavigation.onCommitted.addListener(initiateCookie);
}
main();

// browser.cookies.onChanged.addListener(function(cookie) {
// console.log(cookie.cookie);});
