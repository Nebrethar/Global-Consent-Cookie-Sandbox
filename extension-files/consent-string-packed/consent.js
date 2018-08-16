/*
NAME: grabConsent
PURPOSE: Generates a consent string and sends it to background.js
*/
const { ConsentString } = require('./consent-string')
consent = new ConsentString();
const vendorList = require("./vendorlist");
// Set the global vendor list
// You need to download and provide the vendor list yourself.
consent.setGlobalVendorList(vendorList);
// Set the consent data
consent.setCmpId(1);
consent.setCmpVersion(1);
consent.setConsentScreen(1);
consent.setConsentLanguage('en');
//There ar 5 purposes and they have to be labellsed individually
consent.setPurposesAllowed([]);
var vendors = [];
for (var i=1; i <= 2011; i++)
{
	vendors[i-1] = i;
}
//Set to empty array for no consent, set to vendors for full consent
consent.setVendorsAllowed([]);
// Encode the data into a web-safe base64 string
console.log("New consent string: " + JSON.stringify(consent.getConsentString()));