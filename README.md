# Cookie Web Extension
 
 This public repository is used to publish a FireFox web extension that is used to delete cookies with the "cookies" JavaScript API.
 
 It is currently able to modify cookies temporarily without the use of an API.
 
 ## How to use this web extension
 
 The button "LOG COOKIES" will send names and values of your cookies to the user's browser log (ctrl+shift+J).
 
 The "CHANGE COOKIES" button will rewrite all cookies with the value that is provided in the middle bar. 
 Its changes are kept within the extension, for now.
 
 the "BE MORE SPECIFIC" button allows the user to specify the name of the cookie they would like to temporarily rewrite.
 
 ## API information
 
 APIs used for the first section of the project are provided by Mozilla and can be found at https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API
 
 ## Licensing and Copyright
All source code copyright is retained by the contributors. All contriubtions and source code are licensed under the MIT licence. 
 
Copyright (c) 2018 Cookie-Web-Extension Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
 All icons are used under Open Content license and are labeled for reuse with modification. <br />
 Icons retrieved from https://pixabay.com/en/chocolate-chip-cookie-chocolate-522389/ <br />
 and edited with MS paint.
 
 # THIS IS NOT A FINISHED PROJECT
 
 Right now the functionality this project includes is to:
 
  - Provide logs of all cookie names values when  "LOG COOKIES" is clicked.<br />
  - Provide a button that says "CHANGE COOKIES" that modifies cookies temporarily.<br />
  - Allow user to change specific cookies by name.
  
 ### Next steps for the project:
 
  - Provide more methods of cookie modification and user control<br />
  - Create a new method of showing the user cookie values and information<br />
  - Continue to migrate away from API style of code
