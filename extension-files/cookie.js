document.addEventListener("click", async (event) => {
    function logCookies(cookies) {
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
        let cookies = await browser.cookies.getAll({});
        logCookies(cookies);
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
