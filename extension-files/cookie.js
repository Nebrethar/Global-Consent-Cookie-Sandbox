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
