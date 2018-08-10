//The code below is (c) 2018 IAB Technology Laboratory
//Content is under the MIT License
//Source: https://github.com/InteractiveAdvertisingBureau/Consent-String-SDK-JS/blob/master/README.md

const { ConsentString } = require('./consent-string');

const consentData = new ConsentString();
		var  vendorList  = require('./vendorlist.json');
			// Set the global vendor list
			// You need to download and provide the vendor list yourself
			consentData.setGlobalVendorList(vendorList);

			// Set the consent data
			consentData.setCmpId(1);
			consentData.setCmpVersion(1);
			consentData.setConsentScreen(1);
			consentData.setConsentLanguage('en');
			consentData.setPurposesAllowed([]);
			consentData.setVendorsAllowed([]);
			// Encode the data into a web-safe base64 string
			console.log(consentData.getConsentString());
			
			//End value for {1,1,1,'en',[],[]} is BOSCllVOSCllVABABBENBZAAAAAfaAAA