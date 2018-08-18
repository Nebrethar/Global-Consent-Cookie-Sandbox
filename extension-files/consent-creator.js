"use strict";
 /**
 * Processes "tabs" variable and sends it to removeCookies and addGVCC
 */
async function initiateCookie() {
    browser.webNavigation.onCommitted.removeListener(initiateCookie);
    let tabs = await browser.tabs.query({active: true, currentWindow: true});
    let urlSet = tabs[0].url;
    let nameSet = "euconsent";
    let valueSet = "BOSl-jdOSl-jlABABBENBd-AAAAgV___________" +
            "___________________________________________" +
            "________________________________A";
    let httpOnlySet = false;
    let pathSet = "/";
    let firstPartyDomainSet = "";
    let storeIdSet = "firefox-default";
    // this seems to work pretty well for every website
    let domain = tabs[0].url.split("/")[2];
    let domainSet = "." + domain;
    // for debugging
    //console.log("DOMAIN: " + domain);
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
        // consented. This website just checks if there is a
        // cookie called "banner-cookie". If one is present,
        // it turns off the wall.
        case "www.politico.eu":
            nameSet = "banner-cookie";
            valueSet = "0";
            setCookie();
            break;
        // consented
        case "www.theguardian.com":
            nameSet = "GU_TK";
            valueSet = "1.1534544181584";
            domainSet = ".theguardian.com";
            setCookie();
            break;
        // consented
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
        case "www.euronews.com":
            /* This is based on an Opt-Out cookie that
            quantserve provides. I can't seem to get
            the necessary permissions to create the
            cookie.*/
            domainSet = ".quantserve.com";
            nameSet = "qoo";
            valueSet = "OPT-OUT";
            setCookie();
            break;
        default:
            // cast a wide net
            setCookie();
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
