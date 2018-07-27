var value = (value + "=");
console.log("\n\n**********************************************\n\n");
console.log("--------------------ORIGINAL COOKIES--------------------");
/*pulls all cookies from the current tab.
Uses a WrappedJSObject to work at the browser level.
NOTE - I would like to see about pulling more 
than just the current tab's cookies in the future.*/
var decodedCookie = window.wrappedJSObject.document.cookie;
/*separates cookies into an array by their separating ";"*/
var allcookie = decodedCookie.split(';');
/*Just shows the current state of the cookie.*/
console.log(window.wrappedJSObject.document.cookie + "\n");
/*For if a GVCC is found (by name "euconsent")*/
var found = false;
/*counter for logging*/
var j;
/*This is used to trim the finished 
product of whitespace on both sides.*/
var trimspace;
/*Iterates through all available cookies?*/
for (var i=0;i<allcookie.length;i++)
{
	var inc = allcookie[i];
	j = i+1;
	console.log("\n---------------COOKIE " + j + "---------------");
	console.log(inc);
	var incsplit = inc.split('=');
	/*Name and value. HERE THEY ARE IN FORMAT NAME=VALUE*/
	var incone = incsplit[0];
	//var inctwo = incsplit[1];
	//console.log(incone + " ? " + incthree); 
	if (incone == " euconsent")
	{
		/*Sets an euconsent cookie to a different value (0's for now). Trims value.*/
		found = true;
		console.log("****************CONSENT COOKIE FOUND****************\n\n");
		trimspace = "euconsent=00000000000000000000000000000000000;";
		allcookie[i] = trimspace.trim();
	}
	else if (incone == " gdprconsent")
	{
		/*Sets an euconsent cookie to a different value (0's for now). Trims value.*/
		found = true;
		console.log("****************CONSENT COOKIE FOUND****************\n\n");
		trimspace = "gdprconsent=0;";
		allcookie[i] = trimspace.trim();
	}
	else
	{
		/*Otherwise just cleans it up*/
		trimspace = allcookie[i] + ";";
		allcookie[i] = trimspace.trim();
	}
	//console.log("|" + allcookie[i] + "|");
}
//console.log(allcookie.toString());
if (found)
{
console.log("\n--------------------REPLACE THE VALUE--------------------\n");
console.log("\n");
/*Replaces the cookie value with the edited cookie string. (It is supposed to).
Logs every cookie going in as a separate document.cookie and seems to
have an issue overwriting cookies that website has put in place.
It can overwrite its own cookies.*/
window.wrappedJSObject.document.cookie = "startmarker=****THIS IS THE START OF THE EDITED COOKIE STRING****";
var messenger;
for (var i=0;i<allcookie.length;i++)
{
console.log("*************************************************");
trimspace = allcookie[i];
console.log(trimspace);
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
}
}
window.wrappedJSObject.document.cookie = "endmarker=****THIS IS THE END OF THE EDITED COOKIE STRING****";
console.log("--------------------FINAL COOKIES--------------------\n");
console.log(window.wrappedJSObject.document.cookie);