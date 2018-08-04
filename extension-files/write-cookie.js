finish = function finish(){
var value = (value + "=");
//console.log("\n\n**********************************************\n\n");
//console.log("--------------------ORIGINAL COOKIES--------------------");
/*pulls all cookies from the current tab.
Uses a WrappedJSObject to work at the browser level.
NOTE - I would like to see about pulling more 
than just the current tab's cookies in the future.*/
var decodedCookie = window.wrappedJSObject.document.cookie;
console.log("Cookies Obtained!");
/*separates cookies into an array by their separating ";"*/
var allcookie = decodedCookie.split(';');
/*Just shows the current state of the cookie.*/
//console.log(window.wrappedJSObject.document.cookie + "\n");
/*For if a GVCC is found (by name "euconsent")*/
var found = false;
/*counter for logging*/
var j;
/*This is used to trim the finished 
product of whitespace on both sides.*/
var trimspace;
/*Iterates through all available cookies?*/
var euconsentfound;
for (var i=0;i<allcookie.length;i++)
{
	var inc = allcookie[i];
	j = i+1;
	var incsplit = inc.split('=');
	/*HERE THEY ARE IN FORMAT NAME=VALUE*/
	var incone = incsplit[0];
	var inctwo = incsplit[1];
	//console.log(incone + " ? " + inctwo); 
	var GVCCTicket = inctwo.split('-');
	var last = GVCCTicket[GVCCTicket.length-1]
	if (incone == " euconsent")
	{
		euconsentfound = i;
		/*Sets an euconsent cookie to a different value (0's for now). Trims value.*/
		found = true;
		//console.log("****************CONSENT COOKIE FOUND****************\n\n");
		console.log("GVCC FOUND!");
		trimspace = "euconsent=BORxCNvORxCNvABABBENBZAAAAAfaAAA-" + last + ";";
		//console.log(trimspace);
		allcookie[i] = trimspace.trim();
	}
	else if (incone == " gdprconsent")
	{
		/*Sets an euconsent cookie to a different value (0's for now). Trims value.*/
		found = true;
		//console.log("****************CONSENT COOKIE FOUND****************\n\n");
		trimspace = "gdprconsent=0;";
		allcookie[i] = trimspace.trim();
	}
	/*else
	{
		trimspace = allcookie[i] + ";";
		allcookie[i] = trimspace.trim();
	}*/
	//console.log("|" + allcookie[i] + "|");
}
//console.log(allcookie.toString());
function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`${error}`);
}
function notifyBackgroundPage() {
  var sending = browser.runtime.sendMessage({
    greeting: "go();"
  });
  sending.then(handleResponse, handleError);  
}
notifyBackgroundPage();
console.log("Request Sent to Background Script!");


function handleMessage() {
 found();
}
function found(){
if (euconsentfound != null)
{
console.log("Request got");
//console.log("\n--------------------REPLACE THE VALUE--------------------\n");
//console.log("\n");
/*Replaces the cookie value with the edited cookie string. (It is supposed to).
Logs every cookie going in as a separate document.cookie and seems to
have an issue overwriting cookies that website has put in place.
It can overwrite its own cookies.*/
//window.wrappedJSObject.document.cookie = "startmarker=****THIS IS THE START OF THE EDITED COOKIE STRING****";
var messenger;
var domain;
domain = window.location.host.split(/\.(.+)/)[1];
//console.log("*************************************************");
trimspace = allcookie[euconsentfound] + " path=/; domain=" + domain + "; expirationDate: 1566398584; hostOnly: false; httpOnly: false; session: false;";
//console.log(trimspace);
//window.wrappedJSObject.document.cookie = trimspace.trim();
messenger = {
  notify: function(message) {
    document.cookie = message;
  }
};

  window.wrappedJSObject.messenger = cloneInto(
  messenger,
  window,
  {cloneFunctions: true});
  window.wrappedJSObject.messenger.notify(trimspace.trim());
  console.log("3");
}
}
browser.runtime.onMessage.addListener(handleMessage);
}
//window.wrappedJSObject.document.cookie = "endmarker=****THIS IS THE END OF THE EDITED COOKIE STRING****";
//console.log("--------------------FINAL COOKIES--------------------\n");
//console.log(window.wrappedJSObject.document.cookie);
//setTimeout(finish, 1500);

finish();
//console.log(window.wrappedJSObject.document.cookie);