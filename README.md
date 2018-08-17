 # Global Consent Cookie Sandbox

 This public repository is used to publish a Firefox web extension.
 
 This extension currently overwrites the first section of the Global Vendor Consent Cookie in progress to a larger goal.<br />
 Right now, it only overwrites on the current tab. All information from the extension can be seen on the Firefox log (Ctrl+Shift+J).<br />
 There are also many commented console prints available in the code for debugging purposes.<br />
 The code is not a finished product. Enjoy!
 
 ## How to install this web extension
 
 1. Download this repository to a location of your choice.
 2. Install Web-Ext from Mozilla's Github Repository here: https://github.com/mozilla/web-ext
 
 ### Installation: npm
 
 3. Install Global-Consent-Cookie-Sandbox in its directory:
 ```
 npm install
 ```
 4. After the installation, you can run the program with the following command:
 ```
 npm start
 ```
 This will also launch Web-Ext.
 
  ## How to use this web extension
 
 The button "LOG COOKIES" will send names and values of your cookies to the user's browser log (ctrl+shift+J).
 
 The button "CHECK GVCC" will list only cookies named "euconsent".
 
 The button "CLEAR COOKIES" will remove all cookies from the browser.
 
 The button "MODIFY GVCC" will write over the first section of the GVCC value.
 
 ## Licensing and Copyright
 
 All source code copyright is retained by the contributors. All contriubtions and source code are licensed under the MIT license. 
 
 Copyright (c) 2018 Global-Consent-Cookie-Sandbox Contributors

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
 All icons are used under Open Content license and are labeled for reuse with modification. <br />
 Icons retrieved from https://pixabay.com/en/chocolate-chip-cookie-chocolate-522389/ <br />
 and edited with MS paint.
 
 ### Contributions
 
  The file "require.js" is (c) 2018 IAB Technology Laboratory.<br />
  This content is used under the terms of the MIT License.<br />
  Source: https://github.com/InteractiveAdvertisingBureau/Consent-String-SDK-JS/blob/master/README.md
  
  Javascript WebExtension APIs used for the project are (c) Mozilla MDN.<br />
  This content is dedicated to the Public Domain.  http://creativecommons.org/publicdomain/zero/1.0/<br />
  Source: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API<br /> 
  WebExtension API packages currently used:<br />
   -cookies<br />
   -tabs<br />
   -browsingData<br />
   -runtime<br />
   -webNavigation
   
  The module consent-string is used for consent string generation.
  consent-string is (c) IAB Technology Labs<br />
  This content is used under the MIT license.<br />
  Source: https://www.npmjs.com/package/consent-string
