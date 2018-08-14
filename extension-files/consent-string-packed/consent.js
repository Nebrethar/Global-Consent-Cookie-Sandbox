function grabConsent()
{
	console.log("Generating String!");
// Set the global vendor list
// You need to download and provide the vendor list yourself.
setGlobalVendorList(dummy);
// Set the consent data
setCmpId(1);
setCmpVersion(1);
setConsentScreen(1);
setConsentLanguage('en');
setPurposesAllowed([]);
setVendorsAllowed([]);
// Encode the data into a web-safe base64 string
console.log("new consent string " + JSON.stringify(getConsentString()));
console.log("Finished Running");
}
//********************************************************************************************************
//The following code is a packed and modified version of the node module consent-string.
//consent-string is (c) IAB Technology Labs
//and is used under the MIT license.
//Source: https://www.npmjs.com/package/consent-string
var consentLanguageRegexp = /^[a-z]{2}$/;
	function getConsentString() {
      var updateDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!this.vendorList) {
        throw new Error('ConsentString - A vendor list is required to encode a consent string');
      }

      if (updateDate === true) {
        this.lastUpdated = new Date();
      }

      return encodeConsentString({
        version: this.getVersion(),
        vendorList: this.vendorList,
        allowedPurposeIds: this.allowedPurposeIds,
        allowedVendorIds: this.allowedVendorIds,
        created: this.created,
        lastUpdated: this.lastUpdated,
        cmpId: this.cmpId,
        cmpVersion: this.cmpVersion,
        consentScreen: this.consentScreen,
        consentLanguage: this.consentLanguage,
        vendorListVersion: this.vendorListVersion
      });
    }
  /**
     * Get the web-safe, base64-encoded metadata string
     *
     * @return {string} Web-safe, base64-encoded metadata string
     */
    function getMetadataString() {
      return encodeConsentString({
        version: this.getVersion(),
        created: this.created,
        lastUpdated: this.lastUpdated,
        cmpId: this.cmpId,
        cmpVersion: this.cmpVersion,
        consentScreen: this.consentScreen,
        vendorListVersion: this.vendorListVersion
      });
    }

    /**
     * Decode the web-safe, base64-encoded metadata string
     * @param {string} encodedMetadata Web-safe, base64-encoded metadata string
     * @return {object} decoded metadata
     */
    /**
     * Get the version number that this consent string specification adheres to
     *
     * @return {integer} Version number of consent string specification
     */
    function getVersion() {
      return this.version;
    }

    /**
     * Get the version of the vendor list
     *
     * @return {integer} Vendor list version
     */
	 function getVendorListVersion() {
      return this.vendorListVersion;
    }
    /**
     * Set the vendors list to use when generating the consent string
     *
     * The expected format is the one from https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/Draft_for_Public_Comment_Transparency%20%26%20Consent%20Framework%20-%20cookie%20and%20vendor%20list%20format%20specification%20v1.0a.pdf
     *
     * @param {object} vendorList Vendor list with format from https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/Draft_for_Public_Comment_Transparency%20%26%20Consent%20Framework%20-%20cookie%20and%20vendor%20list%20format%20specification%20v1.0a.pdf
     */
	 function setGlobalVendorList(vendorList) {
      if ((typeof vendorList === 'undefined' ? 'undefined' : _typeof(vendorList)) !== 'object') {
        throw new Error('ConsentString - You must provide an object when setting the global vendor list');
      }

      if (!vendorList.vendorListVersion || !Array.isArray(vendorList.purposes) || !Array.isArray(vendorList.vendors)) {
        // The provided vendor list does not look valid
        throw new Error('ConsentString - The provided vendor list does not respect the schema from the IAB EU’s GDPR Consent and Transparency Framework');
      }

      // Cloning the GVL
      // It's important as we might transform it and don't want to modify objects that we do not own
      this.vendorList = {
        vendorListVersion: vendorList.vendorListVersion,
        lastUpdated: vendorList.lastUpdated,
        purposes: vendorList.purposes,
        features: vendorList.features,

        // Clone the list and sort the vendors by ID (it breaks our range generation algorithm if they are not sorted)
        vendors: vendorList.vendors.slice(0).sort(function (firstVendor, secondVendor) {
          return firstVendor.id < secondVendor.id ? -1 : 1;
        })
      };
      this.vendorListVersion = vendorList.vendorListVersion;
    }

    /**
     * Set the ID of the Consent Management Platform that last modified the consent string
     *
     * Every CMP is assigned a unique ID by the IAB EU that must be provided here before changing any other value in the consent string.
     *
     * @param {integer} id CMP ID
     */
    function setCmpId(id) {
      this.cmpId = id;
    }

    /**
     * Get the ID of the Consent Management Platform from the consent string
     *
     * @return {integer}
	*/
    function getCmpId() {
      return this.cmpId;
    }

    /**
     * Set the version of the Consent Management Platform that last modified the consent string
     *
     * This version number references the CMP code running when collecting the user consent.
     *
     * @param {integer} version Version
     */
    function setCmpVersion(version) {
      this.cmpVersion = version;
    }

    /**
     * Get the verison of the Consent Management Platform that last modified the consent string
     *
     * @return {integer}
     */
    function getCmpVersion() {
      return this.cmpVersion;
    }

    /**
     * Set the Consent Management Platform screen ID that collected the user consent
     *
     * This screen ID references a unique view in the CMP that was displayed to the user to collect consent
     *
     * @param {*} screenId Screen ID
     */
    function setConsentScreen(screenId) {
      this.consentScreen = screenId;
    }

    /**
     * Get the Consent Management Platform screen ID that collected the user consent
     *
     * @return {integer}
     */
    function getConsentScreen() {
      return this.consentScreen;
    }

    /**
     * Set the language that the CMP asked the consent in
     *
     * @param {string} language Two-letter ISO639-1 code (en, fr, de, etc.)
     */
    function setConsentLanguage(language) {
      if (consentLanguageRegexp.test(language) === false) {
        throw new Error('ConsentString - The consent language must be a two-letter ISO639-1 code (en, fr, de, etc.)');
      }

      this.consentLanguage = language;
    }

    /**
     * Get the language that the CMP asked consent in
     *
     * @return {string} Two-letter ISO639-1 code (en, fr, de, etc.)
	*/
    function getConsentLanguage() {
      return this.consentLanguage;
    }

    /**
     * Set the list of purpose IDs that the user has given consent to
     *
     * @param {integer[]} purposeIds An array of integers that map to the purposes defined in the vendor list. Purposes included in the array are purposes that the user has given consent to
     */
    function setPurposesAllowed(purposeIds) {
      this.allowedPurposeIds = purposeIds;
    }

    /**
     * Get the list of purpose IDs that the user has given consent to
     *
     * @return {integer[]}
     */
    function getPurposesAllowed() {
      return this.allowedPurposeIds;
    }

    /**
     * Set the consent status of a user for a given purpose
     *
     * @param {integer} purposeId The ID (from the vendor list) of the purpose to update
     * @param {boolean} value Consent status
	*/
    function setPurposeAllowed(purposeId, value) {
      var purposeIndex = this.allowedPurposeIds.indexOf(purposeId);

      if (value === true) {
        if (purposeIndex === -1) {
          this.allowedPurposeIds.push(purposeId);
        }
      } else if (value === false) {
        if (purposeIndex !== -1) {
          this.allowedPurposeIds.splice(purposeIndex, 1);
        }
      }
    }

    /**
     * Check if the user has given consent for a specific purpose
     *
     * @param {integer} purposeId
     *
     * @return {boolean}
     */
    function isPurposeAllowed(purposeId) {
      return this.allowedPurposeIds.indexOf(purposeId) !== -1;
    }

    /**
     * Set the list of vendor IDs that the user has given consent to
     *
     * @param {integer[]} vendorIds An array of integers that map to the vendors defined in the vendor list. Vendors included in the array are vendors that the user has given consent to
     */
    function setVendorsAllowed(vendorIds) {
      this.allowedVendorIds = vendorIds;
    }

    /**
     * Get the list of vendor IDs that the user has given consent to
     *
     * @return {integer[]}
     */
    function getVendorsAllowed() {
      return this.allowedVendorIds;
    }

    /**
     * Set the consent status of a user for a given vendor
     *
     * @param {integer} vendorId The ID (from the vendor list) of the vendor to update
     * @param {boolean} value Consent status
     */
    function setVendorAllowed(vendorId, value) {
      var vendorIndex = this.allowedVendorIds.indexOf(vendorId);

      if (value === true) {
        if (vendorIndex === -1) {
          this.allowedVendorIds.push(vendorId);
        }
      } else if (value === false) {
        if (vendorIndex !== -1) {
          this.allowedVendorIds.splice(vendorIndex, 1);
        }
      }
    }

    /**
     * Check if the user has given consent for a specific vendor
     *
     * @param {integer} vendorId
     *
     * @return {boolean}
     */
    function isVendorAllowed(vendorId) {
      return this.allowedVendorIds.indexOf(vendorId) !== -1;
    }
    function decodeMetadataString(encodedMetadata) {
      var decodedString = decodeConsentString(encodedMetadata);
      var metadata = {};
      vendorVersionMap[decodedString.version].metadataFields.forEach(function (field) {
        metadata[field] = decodedString[field];
      });
      return metadata;
    }
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _arrayFrom = Array.from || function () {
  var isCallable = function isCallable(fn) {
    return typeof fn === 'function';
  };
};

  var toInteger = function toInteger(value) {
    var number = Number(value);

    if (isNaN(number)) {
      return 0;
    }

    if (number === 0 || !isFinite(number)) {
      return number;
    }

    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };

  var maxSafeInteger = Math.pow(2, 53) - 1;

  var toLength = function toLength(value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };

  var iteratorProp = function iteratorProp(value) {
    if (value != null) {
      if (['string', 'number', 'boolean', 'symbol'].indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) > -1) {
        return Symbol.iterator;
      } else if (typeof Symbol !== 'undefined' && 'iterator' in Symbol && Symbol.iterator in value) {
        return Symbol.iterator;
      } else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };

  var getMethod = function getMethod(O, P) {
    if (O != null && P != null) {
      var func = O[P];

      if (func == null) {
        return void 0;
      }

      if (!isCallable(func)) {
        throw new TypeError(func + " is not a function");
      }

      return func;
    }
  };

  var iteratorStep = function iteratorStep(iterator) {
    var result = iterator.next();
    var done = Boolean(result.done);

    if (done) {
      return false;
    }

    return result;
  };

  function from(items) {
    

    var C = this;
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;
    var T;

    if (typeof mapFn !== 'undefined') {
      if (!isCallable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      }

      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    var A, k;
    var usingIterator = getMethod(items, iteratorProp(items));

    if (usingIterator !== void 0) {
      A = isCallable(C) ? Object(new C()) : [];
      var iterator = usingIterator.call(items);

      if (iterator == null) {
        throw new TypeError("Array.from requires an array-like or iterable object");
      }

      k = 0;
      var next, nextValue;

      while (true) {
        next = iteratorStep(iterator);

        if (!next) {
          A.length = k;
          return A;
        }

        nextValue = next.value;

        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        } else {
          A[k] = nextValue;
        }

        k++;
      }
    } else {
      var arrayLike = Object(items);

      if (items == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      var len = toLength(arrayLike.length);
      A = isCallable(C) ? Object(new C(len)) : new Array(len);
      k = 0;
      var kValue;

      while (k < len) {
        kValue = arrayLike[k];

        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k++;
      }

      A.length = len;
    }

    return A;
  };
/**
 * Decode consent data from a web-safe base64-encoded string
 *
 * @param {string} consentString
 */


function decodeConsentString(consentString) {
  var _decodeFromBase = decodeFromBase64(consentString),
      version = _decodeFromBase.version,
      cmpId = _decodeFromBase.cmpId,
      vendorListVersion = _decodeFromBase.vendorListVersion,
      purposeIdBitString = _decodeFromBase.purposeIdBitString,
      maxVendorId = _decodeFromBase.maxVendorId,
      created = _decodeFromBase.created,
      lastUpdated = _decodeFromBase.lastUpdated,
      isRange = _decodeFromBase.isRange,
      defaultConsent = _decodeFromBase.defaultConsent,
      vendorIdBitString = _decodeFromBase.vendorIdBitString,
      vendorRangeList = _decodeFromBase.vendorRangeList,
      cmpVersion = _decodeFromBase.cmpVersion,
      consentScreen = _decodeFromBase.consentScreen,
      consentLanguage = _decodeFromBase.consentLanguage;

  var consentStringData = {
    version: version,
    cmpId: cmpId,
    vendorListVersion: vendorListVersion,
    allowedPurposeIds: decodeBitsToIds(purposeIdBitString),
    maxVendorId: maxVendorId,
    created: created,
    lastUpdated: lastUpdated,
    cmpVersion: cmpVersion,
    consentScreen: consentScreen,
    consentLanguage: consentLanguage
  };

  if (isRange) {
    /* eslint no-shadow: off */
    var idMap = vendorRangeList.reduce(function (acc, _ref) {
      var isRange = _ref.isRange,
          startVendorId = _ref.startVendorId,
          endVendorId = _ref.endVendorId;

      var lastVendorId = isRange ? endVendorId : startVendorId;

      for (var i = startVendorId; i <= lastVendorId; i += 1) {
        acc[i] = true;
      }

      return acc;
    }, {});

    consentStringData.allowedVendorIds = [];

    for (var i = 0; i <= maxVendorId; i += 1) {
      if (defaultConsent && !idMap[i] || !defaultConsent && idMap[i]) {
        if (consentStringData.allowedVendorIds.indexOf(i) === -1) {
          consentStringData.allowedVendorIds.push(i);
        }
      }
    }
  } else {
    consentStringData.allowedVendorIds = decodeBitsToIds(vendorIdBitString);
  }

  return consentStringData;
}




var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _arrayFrom = Array.from || function () {
  var isCallable = function isCallable(fn) {
    return typeof fn === 'function';
  };

  var toInteger = function toInteger(value) {
    var number = Number(value);

    if (isNaN(number)) {
      return 0;
    }

    if (number === 0 || !isFinite(number)) {
      return number;
    }

    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };

  var maxSafeInteger = Math.pow(2, 53) - 1;

  var toLength = function toLength(value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };

  var iteratorProp = function iteratorProp(value) {
    if (value != null) {
      if (['string', 'number', 'boolean', 'symbol'].indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) > -1) {
        return Symbol.iterator;
      } else if (typeof Symbol !== 'undefined' && 'iterator' in Symbol && Symbol.iterator in value) {
        return Symbol.iterator;
      } else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };

  var getMethod = function getMethod(O, P) {
    if (O != null && P != null) {
      var func = O[P];

      if (func == null) {
        return void 0;
      }

      if (!isCallable(func)) {
        throw new TypeError(func + " is not a function");
      }

      return func;
    }
  };

  var iteratorStep = function iteratorStep(iterator) {
    var result = iterator.next();
    var done = Boolean(result.done);

    if (done) {
      return false;
    }

    return result;
  };

  return function from(items) {
    

    var C = this;
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;
    var T;

    if (typeof mapFn !== 'undefined') {
      if (!isCallable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      }

      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    var A, k;
    var usingIterator = getMethod(items, iteratorProp(items));

    if (usingIterator !== void 0) {
      A = isCallable(C) ? Object(new C()) : [];
      var iterator = usingIterator.call(items);

      if (iterator == null) {
        throw new TypeError("Array.from requires an array-like or iterable object");
      }

      k = 0;
      var next, nextValue;

      while (true) {
        next = iteratorStep(iterator);

        if (!next) {
          A.length = k;
          return A;
        }

        nextValue = next.value;

        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        } else {
          A[k] = nextValue;
        }

        k++;
      }
    } else {
      var arrayLike = Object(items);

      if (items == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      var len = toLength(arrayLike.length);
      A = isCallable(C) ? Object(new C(len)) : new Array(len);
      k = 0;
      var kValue;

      while (k < len) {
        kValue = arrayLike[k];

        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k++;
      }

      A.length = len;
    }
	return A;
};
}

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return _arrayFrom(arr); } }

/**
 * Encode a list of vendor IDs into bits
 *
 * @param {integer} maxVendorId Highest vendor ID in the vendor list
 * @param {integer[]} allowedVendorIds Vendors that the user has given consent to
 */


function encodeVendorIdsToBits(maxVendorId) {
  var allowedVendorIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var vendorString = '';

  for (var id = 1; id <= maxVendorId; id += 1) {
    vendorString += allowedVendorIds.indexOf(id) !== -1 ? '1' : '0';
  }

  return padRight(vendorString, Math.max(0, maxVendorId - vendorString.length));
}

/**
 * Encode a list of purpose IDs into bits
 *
 * @param {*} purposes List of purposes from the vendor list
 * @param {*} allowedPurposeIds List of purpose IDs that the user has given consent to
 */
function encodePurposeIdsToBits(purposes) {
  var allowedPurposeIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();

  var maxPurposeId = Math.max.apply(Math, [0].concat(_toConsumableArray(purposes.map(function (_ref) {
    var id = _ref.id;
    return id;
  })), _toConsumableArray(_arrayFrom(allowedPurposeIds))));

  var purposeString = '';

  for (var id = 1; id <= maxPurposeId; id += 1) {
    purposeString += allowedPurposeIds.indexOf(id) !== -1 ? '1' : '0';
  }

  return purposeString;
}

/**
 * Convert a list of vendor IDs to ranges
 *
 * @param {object[]} vendors List of vendors from the vendor list (important: this list must to be sorted by ID)
 * @param {integer[]} allowedVendorIds List of vendor IDs that the user has given consent to
 */
function convertVendorsToRanges(vendors, allowedVendorIds) {
  var range = [];

  var idsInList = vendors.map(function (vendor) {
    return vendor.id;
  });

  return vendors.reduce(function (acc, _ref2, index) {
    var id = _ref2.id;

    if (allowedVendorIds.indexOf(id) !== -1) {
      range.push(id);
    }

    // Do we need to close the current range?
    if ((allowedVendorIds.indexOf(id) === -1 // The vendor we are evaluating is not allowed
    || index === vendors.length - 1 // There is no more vendor to evaluate
    || idsInList.indexOf(id + 1) === -1 // There is no vendor after this one (ie there is a gap in the vendor IDs) ; we need to stop here to avoid including vendors that do not have consent
    ) && range.length) {
      var startVendorId = range.shift();
      var endVendorId = range.pop();

      range = [];

      return [].concat(_toConsumableArray(acc), [{
        isRange: typeof endVendorId === 'number',
        startVendorId: startVendorId,
        endVendorId: endVendorId
      }]);
    }

    return acc;
  }, []);
}

/**
 * Encode consent data into a web-safe base64-encoded string
 *
 * @param {object} consentData Data to include in the string (see `utils/definitions.js` for the list of fields)
 */
function encodeConsentString(consentData) {
  var maxVendorId = consentData.maxVendorId;
  var _consentData$vendorLi = consentData.vendorList,
      vendorList = _consentData$vendorLi === undefined ? {} : _consentData$vendorLi,
      allowedPurposeIds = consentData.allowedPurposeIds,
      allowedVendorIds = consentData.allowedVendorIds;
  var _vendorList$vendors = vendorList.vendors,
      vendors = _vendorList$vendors === undefined ? [] : _vendorList$vendors,
      _vendorList$purposes = vendorList.purposes,
      purposes = _vendorList$purposes === undefined ? [] : _vendorList$purposes;


  if (!maxVendorId) {
    // Find the max vendor ID from the vendor list if it has not been provided
    maxVendorId = 0;

    vendors.forEach(function (vendor) {
      if (vendor.id > maxVendorId) {
        maxVendorId = vendor.id;
      }
    });
  }

  // Encode the data with and without ranges and return the smallest encoded payload
  var noRangesData = encodeToBase64(_extends({}, consentData, {
    maxVendorId: maxVendorId,
    purposeIdBitString: encodePurposeIdsToBits(purposes, allowedPurposeIds),
    isRange: false,
    vendorIdBitString: encodeVendorIdsToBits(maxVendorId, allowedVendorIds)
  }));

  var vendorRangeList = convertVendorsToRanges(vendors, allowedVendorIds);

  var rangesData = encodeToBase64(_extends({}, consentData, {
    maxVendorId: maxVendorId,
    purposeIdBitString: encodePurposeIdsToBits(purposes, allowedPurposeIds),
    isRange: true,
    defaultConsent: false,
    numEntries: vendorRangeList.length,
    vendorRangeList: vendorRangeList
  }));

  return noRangesData.length < rangesData.length ? noRangesData : rangesData;
}




var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _arrayFrom = Array.from || function () {
  var isCallable = function isCallable(fn) {
    return typeof fn === 'function';
  };

  var toInteger = function toInteger(value) {
    var number = Number(value);

    if (isNaN(number)) {
      return 0;
    }

    if (number === 0 || !isFinite(number)) {
      return number;
    }

    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };

  var maxSafeInteger = Math.pow(2, 53) - 1;

  var toLength = function toLength(value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };

  var iteratorProp = function iteratorProp(value) {
    if (value != null) {
      if (['string', 'number', 'boolean', 'symbol'].indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) > -1) {
        return Symbol.iterator;
      } else if (typeof Symbol !== 'undefined' && 'iterator' in Symbol && Symbol.iterator in value) {
        return Symbol.iterator;
      } else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };

  var getMethod = function getMethod(O, P) {
    if (O != null && P != null) {
      var func = O[P];

      if (func == null) {
        return void 0;
      }

      if (!isCallable(func)) {
        throw new TypeError(func + " is not a function");
      }

      return func;
    }
  };

  var iteratorStep = function iteratorStep(iterator) {
    var result = iterator.next();
    var done = Boolean(result.done);

    if (done) {
      return false;
    }

    return result;
  };

  return function from(items) {
    

    var C = this;
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;
    var T;

    if (typeof mapFn !== 'undefined') {
      if (!isCallable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      }

      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    var A, k;
    var usingIterator = getMethod(items, iteratorProp(items));

    if (usingIterator !== void 0) {
      A = isCallable(C) ? Object(new C()) : [];
      var iterator = usingIterator.call(items);

      if (iterator == null) {
        throw new TypeError("Array.from requires an array-like or iterable object");
      }

      k = 0;
      var next, nextValue;

      while (true) {
        next = iteratorStep(iterator);

        if (!next) {
          A.length = k;
          return A;
        }

        nextValue = next.value;

        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        } else {
          A[k] = nextValue;
        }

        k++;
      }
    } else {
      var arrayLike = Object(items);

      if (items == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      var len = toLength(arrayLike.length);
      A = isCallable(C) ? Object(new C(len)) : new Array(len);
      k = 0;
      var kValue;

      while (k < len) {
        kValue = arrayLike[k];

        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k++;
      }

      A.length = len;
    }

    return A;
  };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return _arrayFrom(arr); } }

/* eslint no-use-before-define: off */

var base64 = __webpack_require__(6);

var _require = __webpack_require__(3),
    versionNumBits = _require.versionNumBits,
    vendorVersionMap = _require.vendorVersionMap;

function repeat(count) {
  var string = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';

  var padString = '';

  for (var i = 0; i < count; i += 1) {
    padString += string;
  }

  return padString;
}

function padLeft(string, padding) {
  return repeat(Math.max(0, padding)) + string;
}

function padRight(string, padding) {
  return string + repeat(Math.max(0, padding));
}

function encodeIntToBits(number, numBits) {
  var bitString = '';

  if (typeof number === 'number' && !isNaN(number)) {
    bitString = parseInt(number, 10).toString(2);
  }

  // Pad the string if not filling all bits
  if (numBits >= bitString.length) {
    bitString = padLeft(bitString, numBits - bitString.length);
  }

  // Truncate the string if longer than the number of bits
  if (bitString.length > numBits) {
    bitString = bitString.substring(0, numBits);
  }

  return bitString;
}

function encodeBoolToBits(value) {
  return encodeIntToBits(value === true ? 1 : 0, 1);
}

function encodeDateToBits(date, numBits) {
  if (date instanceof Date) {
    return encodeIntToBits(date.getTime() / 100, numBits);
  }
  return encodeIntToBits(date, numBits);
}

function encodeLetterToBits(letter, numBits) {
  return encodeIntToBits(letter.toUpperCase().charCodeAt(0) - 65, numBits);
}

function encodeLanguageToBits(language) {
  var numBits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;

  return encodeLetterToBits(language.slice(0, 1), numBits / 2) + encodeLetterToBits(language.slice(1), numBits / 2);
}

function decodeBitsToInt(bitString, start, length) {
  return parseInt(bitString.substr(start, length), 2);
}

function decodeBitsToDate(bitString, start, length) {
  return new Date(decodeBitsToInt(bitString, start, length) * 100);
}

function decodeBitsToBool(bitString, start) {
  return parseInt(bitString.substr(start, 1), 2) === 1;
}

function decodeBitsToLetter(bitString) {
  var letterCode = decodeBitsToInt(bitString);
  return String.fromCharCode(letterCode + 65).toLowerCase();
}

function decodeBitsToLanguage(bitString, start, length) {
  var languageBitString = bitString.substr(start, length);

  return decodeBitsToLetter(languageBitString.slice(0, length / 2)) + decodeBitsToLetter(languageBitString.slice(length / 2));
}

function encodeField(_ref) {
  var input = _ref.input,
      field = _ref.field;
  var name = field.name,
      type = field.type,
      numBits = field.numBits,
      encoder = field.encoder,
      validator = field.validator;


  if (typeof validator === 'function') {
    if (!validator(input)) {
      return '';
    }
  }
  if (typeof encoder === 'function') {
    return encoder(input);
  }

  var bitCount = typeof numBits === 'function' ? numBits(input) : numBits;

  var inputValue = input[name];
  var fieldValue = inputValue === null || inputValue === undefined ? '' : inputValue;

  switch (type) {
    case 'int':
      return encodeIntToBits(fieldValue, bitCount);
    case 'bool':
      return encodeBoolToBits(fieldValue);
    case 'date':
      return encodeDateToBits(fieldValue, bitCount);
    case 'bits':
      return padRight(fieldValue, bitCount - fieldValue.length).substring(0, bitCount);
    case 'list':
      return fieldValue.reduce(function (acc, listValue) {
        return acc + encodeFields({
          input: listValue,
          fields: field.fields
        });
      }, '');
    case 'language':
      return encodeLanguageToBits(fieldValue, bitCount);
    default:
      throw new Error('ConsentString - Unknown field type ' + type + ' for encoding');
  }
}

function encodeFields(_ref2) {
  var input = _ref2.input,
      fields = _ref2.fields;

  return fields.reduce(function (acc, field) {
    acc += encodeField({ input: input, field: field });

    return acc;
  }, '');
}

function decodeField(_ref3) {
  var input = _ref3.input,
      output = _ref3.output,
      startPosition = _ref3.startPosition,
      field = _ref3.field;
  var type = field.type,
      numBits = field.numBits,
      decoder = field.decoder,
      validator = field.validator,
      listCount = field.listCount;


  if (typeof validator === 'function') {
    if (!validator(output)) {
      // Not decoding this field so make sure we start parsing the next field at
      // the same point
      return { newPosition: startPosition };
    }
  }

  if (typeof decoder === 'function') {
    return decoder(input, output, startPosition);
  }

  var bitCount = typeof numBits === 'function' ? numBits(output) : numBits;

  var listEntryCount = 0;
  if (typeof listCount === 'function') {
    listEntryCount = listCount(output);
  } else if (typeof listCount === 'number') {
    listEntryCount = listCount;
  }

  switch (type) {
    case 'int':
      return { fieldValue: decodeBitsToInt(input, startPosition, bitCount) };
    case 'bool':
      return { fieldValue: decodeBitsToBool(input, startPosition) };
    case 'date':
      return { fieldValue: decodeBitsToDate(input, startPosition, bitCount) };
    case 'bits':
      return { fieldValue: input.substr(startPosition, bitCount) };
    case 'list':
      return new Array(listEntryCount).fill().reduce(function (acc) {
        var _decodeFields = decodeFields({
          input: input,
          fields: field.fields,
          startPosition: acc.newPosition
        }),
            decodedObject = _decodeFields.decodedObject,
            newPosition = _decodeFields.newPosition;

        return {
          fieldValue: [].concat(_toConsumableArray(acc.fieldValue), [decodedObject]),
          newPosition: newPosition
        };
      }, { fieldValue: [], newPosition: startPosition });
    case 'language':
      return { fieldValue: decodeBitsToLanguage(input, startPosition, bitCount) };
    default:
      throw new Error('ConsentString - Unknown field type ' + type + ' for decoding');
  }
}

function decodeFields(_ref4) {
  var input = _ref4.input,
      fields = _ref4.fields,
      _ref4$startPosition = _ref4.startPosition,
      startPosition = _ref4$startPosition === undefined ? 0 : _ref4$startPosition;

  var position = startPosition;

  var decodedObject = fields.reduce(function (acc, field) {
    var name = field.name,
        numBits = field.numBits;

    var _decodeField = decodeField({
      input: input,
      output: acc,
      startPosition: position,
      field: field
    }),
        fieldValue = _decodeField.fieldValue,
        newPosition = _decodeField.newPosition;

    if (fieldValue !== undefined) {
      acc[name] = fieldValue;
    }

    if (newPosition !== undefined) {
      position = newPosition;
    } else if (typeof numBits === 'number') {
      position += numBits;
    }

    return acc;
  }, {});

  return {
    decodedObject: decodedObject,
    newPosition: position
  };
}

/**
 * Encode the data properties to a bit string. Encoding will encode
 * either `selectedVendorIds` or the `vendorRangeList` depending on
 * the value of the `isRange` flag.
 */
function encodeDataToBits(data, definitionMap) {
  var version = data.version;


  if (typeof version !== 'number') {
    throw new Error('ConsentString - No version field to encode');
  } else if (!definitionMap[version]) {
    throw new Error('ConsentString - No definition for version ' + version);
  } else {
    var fields = definitionMap[version].fields;
    return encodeFields({ input: data, fields: fields });
  }
}

/**
 * Take all fields required to encode the consent string and produce the URL safe Base64 encoded value
 */
function encodeToBase64(data) {
  var definitionMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : vendorVersionMap;

  var binaryValue = encodeDataToBits(data, definitionMap);

  if (binaryValue) {
    // Pad length to multiple of 8
    var paddedBinaryValue = padRight(binaryValue, 7 - (binaryValue.length + 7) % 8);

    // Encode to bytes
    var bytes = '';
    for (var i = 0; i < paddedBinaryValue.length; i += 8) {
      bytes += String.fromCharCode(parseInt(paddedBinaryValue.substr(i, 8), 2));
    }

    // Make base64 string URL friendly
    return base64.encode(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  return null;
}

function decodeConsentStringBitValue(bitString) {
  var definitionMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : vendorVersionMap;

  var version = decodeBitsToInt(bitString, 0, versionNumBits);

  if (typeof version !== 'number') {
    throw new Error('ConsentString - Unknown version number in the string to decode');
  } else if (!vendorVersionMap[version]) {
    throw new Error('ConsentString - Unsupported version ' + version + ' in the string to decode');
  }

  var fields = definitionMap[version].fields;

  var _decodeFields2 = decodeFields({ input: bitString, fields: fields }),
      decodedObject = _decodeFields2.decodedObject;

  return decodedObject;
}

/**
 * Decode the (URL safe Base64) value of a consent string into an object.
 */
function decodeFromBase64(consentString, definitionMap) {
  // Add padding
  var unsafe = consentString;
  while (unsafe.length % 4 !== 0) {
    unsafe += '=';
  }

  // Replace safe characters
  unsafe = unsafe.replace(/-/g, '+').replace(/_/g, '/');

  var bytes = base64.decode(unsafe);

  var inputBits = '';
  for (var i = 0; i < bytes.length; i += 1) {
    var bitString = bytes.charCodeAt(i).toString(2);
    inputBits += padLeft(bitString, 8 - bitString.length);
  }

  return decodeConsentStringBitValue(inputBits, definitionMap);
}

function decodeBitsToIds(bitString) {
  return bitString.split('').reduce(function (acc, bit, index) {
    if (bit === '1') {
      if (acc.indexOf(index + 1) === -1) {
        acc.push(index + 1);
      }
    }
    return acc;
  }, []);
}





var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _arrayFrom = Array.from || function () {
  var isCallable = function isCallable(fn) {
    return typeof fn === 'function';
  };

  var toInteger = function toInteger(value) {
    var number = Number(value);

    if (isNaN(number)) {
      return 0;
    }

    if (number === 0 || !isFinite(number)) {
      return number;
    }

    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };

  var maxSafeInteger = Math.pow(2, 53) - 1;

  var toLength = function toLength(value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };

  var iteratorProp = function iteratorProp(value) {
    if (value != null) {
      if (['string', 'number', 'boolean', 'symbol'].indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) > -1) {
        return Symbol.iterator;
      } else if (typeof Symbol !== 'undefined' && 'iterator' in Symbol && Symbol.iterator in value) {
        return Symbol.iterator;
      } else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };

  var getMethod = function getMethod(O, P) {
    if (O != null && P != null) {
      var func = O[P];

      if (func == null) {
        return void 0;
      }

      if (!isCallable(func)) {
        throw new TypeError(func + " is not a function");
      }

      return func;
    }
  };

  var iteratorStep = function iteratorStep(iterator) {
    var result = iterator.next();
    var done = Boolean(result.done);

    if (done) {
      return false;
    }

    return result;
  };

  return function from(items) {
    

    var C = this;
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;
    var T;

    if (typeof mapFn !== 'undefined') {
      if (!isCallable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      }

      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    var A, k;
    var usingIterator = getMethod(items, iteratorProp(items));

    if (usingIterator !== void 0) {
      A = isCallable(C) ? Object(new C()) : [];
      var iterator = usingIterator.call(items);

      if (iterator == null) {
        throw new TypeError("Array.from requires an array-like or iterable object");
      }

      k = 0;
      var next, nextValue;

      while (true) {
        next = iteratorStep(iterator);

        if (!next) {
          A.length = k;
          return A;
        }

        nextValue = next.value;

        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        } else {
          A[k] = nextValue;
        }

        k++;
      }
    } else {
      var arrayLike = Object(items);

      if (items == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      var len = toLength(arrayLike.length);
      A = isCallable(C) ? Object(new C(len)) : new Array(len);
      k = 0;
      var kValue;

      while (k < len) {
        kValue = arrayLike[k];

        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k++;
      }

      A.length = len;
    }

    return A;
  };
}();

/**
 * Number of bits for encoding the version integer
 * Expected to be the same across versions
 */
var versionNumBits = 6;

/**
 * Definition of the consent string encoded format
 *
 * From https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/Draft_for_Public_Comment_Transparency%20%26%20Consent%20Framework%20-%20cookie%20and%20vendor%20list%20format%20specification%20v1.0a.pdf
 */
var vendorVersionMap = {
  /**
   * Version 1
   */
  1: {
    version: 1,
    metadataFields: ['version', 'created', 'lastUpdated', 'cmpId', 'cmpVersion', 'consentScreen', 'vendorListVersion'],
    fields: [{ name: 'version', type: 'int', numBits: 6 }, { name: 'created', type: 'date', numBits: 36 }, { name: 'lastUpdated', type: 'date', numBits: 36 }, { name: 'cmpId', type: 'int', numBits: 12 }, { name: 'cmpVersion', type: 'int', numBits: 12 }, { name: 'consentScreen', type: 'int', numBits: 6 }, { name: 'consentLanguage', type: 'language', numBits: 12 }, { name: 'vendorListVersion', type: 'int', numBits: 12 }, { name: 'purposeIdBitString', type: 'bits', numBits: 24 }, { name: 'maxVendorId', type: 'int', numBits: 16 }, { name: 'isRange', type: 'bool', numBits: 1 }, {
      name: 'vendorIdBitString',
      type: 'bits',
      numBits: function numBits(decodedObject) {
        return decodedObject.maxVendorId;
      },
      validator: function validator(decodedObject) {
        return !decodedObject.isRange;
      }
    }, {
      name: 'defaultConsent',
      type: 'bool',
      numBits: 1,
      validator: function validator(decodedObject) {
        return decodedObject.isRange;
      }
    }, {
      name: 'numEntries',
      numBits: 12,
      type: 'int',
      validator: function validator(decodedObject) {
        return decodedObject.isRange;
      }
    }, {
      name: 'vendorRangeList',
      type: 'list',
      listCount: function listCount(decodedObject) {
        return decodedObject.numEntries;
      },
      validator: function validator(decodedObject) {
        return decodedObject.isRange;
      },
      fields: [{
        name: 'isRange',
        type: 'bool',
        numBits: 1
      }, {
        name: 'startVendorId',
        type: 'int',
        numBits: 16
      }, {
        name: 'endVendorId',
        type: 'int',
        numBits: 16,
        validator: function validator(decodedObject) {
          return decodedObject.isRange;
        }
      }]
    }]
  }
};

module.exports = {
  versionNumBits: versionNumBits,
  vendorVersionMap: vendorVersionMap
};




var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arrayFrom = Array.from || function () {
  var isCallable = function isCallable(fn) {
    return typeof fn === 'function';
  };

  var toInteger = function toInteger(value) {
    var number = Number(value);

    if (isNaN(number)) {
      return 0;
    }

    if (number === 0 || !isFinite(number)) {
      return number;
    }

    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };

  var maxSafeInteger = Math.pow(2, 53) - 1;

  var toLength = function toLength(value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };

  var iteratorProp = function iteratorProp(value) {
    if (value != null) {
      if (['string', 'number', 'boolean', 'symbol'].indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) > -1) {
        return Symbol.iterator;
      } else if (typeof Symbol !== 'undefined' && 'iterator' in Symbol && Symbol.iterator in value) {
        return Symbol.iterator;
      } else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };

  var getMethod = function getMethod(O, P) {
    if (O != null && P != null) {
      var func = O[P];

      if (func == null) {
        return void 0;
      }

      if (!isCallable(func)) {
        throw new TypeError(func + " is not a function");
      }

      return func;
    }
  };

  var iteratorStep = function iteratorStep(iterator) {
    var result = iterator.next();
    var done = Boolean(result.done);

    if (done) {
      return false;
    }

    return result;
  };

  return function from(items) {
    

    var C = this;
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;
    var T;

    if (typeof mapFn !== 'undefined') {
      if (!isCallable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      }

      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    var A, k;
    var usingIterator = getMethod(items, iteratorProp(items));

    if (usingIterator !== void 0) {
      A = isCallable(C) ? Object(new C()) : [];
      var iterator = usingIterator.call(items);

      if (iterator == null) {
        throw new TypeError("Array.from requires an array-like or iterable object");
      }

      k = 0;
      var next, nextValue;

      while (true) {
        next = iteratorStep(iterator);

        if (!next) {
          A.length = k;
          return A;
        }

        nextValue = next.value;

        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        } else {
          A[k] = nextValue;
        }

        k++;
      }
    } else {
      var arrayLike = Object(items);

      if (items == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      var len = toLength(arrayLike.length);
      A = isCallable(C) ? Object(new C(len)) : new Array(len);
      k = 0;
      var kValue;

      while (k < len) {
        kValue = arrayLike[k];

        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k++;
      }

      A.length = len;
    }

    return A;
  };
};
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(1),
    encodeConsentString = _require.encodeConsentString;

var _require2 = __webpack_require__(0),
    decodeConsentString = _require2.decodeConsentString;

var _require3 = __webpack_require__(3),
    vendorVersionMap = _require3.vendorVersionMap;

/**
 * Regular expression for validating
 */


var consentLanguageRegexp = /^[a-z]{2}$/;
  function ConsentString() {
    var baseString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, ConsentString);

    this.created = new Date();
    this.lastUpdated = new Date();

    /**
     * Version number of consent string specification
     *
     * @type {integer}
     */
    this.version = 1;

    /**
     * Vendor list with format from https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/Draft_for_Public_Comment_Transparency%20%26%20Consent%20Framework%20-%20cookie%20and%20vendor%20list%20format%20specification%20v1.0a.pdf
     *
     * @type {object}
     */
    this.vendorList = null;

    /**
     * Version of the vendor list used for the purposes and vendors
     *
     * @type {integer}
     */
    this.vendorListVersion = null;

    /**
     * The unique ID of the CMP that last modified the consent string
     *
     * @type {integer}
     */
    this.cmpId = null;

    /**
     * Version of the code used by the CMP when collecting consent
     *
     * @type {integer}
     */
    this.cmpVersion = null;

    /**
     * ID of the screen used by CMP when collecting consent
     *
     * @type {integer}
     */
    this.consentScreen = null;

    /**
     * Two-letter ISO639-1 code (en, fr, de, etc.) of the language that the CMP asked consent in
     *
     * @type {string}
     */
    this.consentLanguage = null;

    /**
     * List of purpose IDs that the user has given consent to
     *
     * @type {integer[]}
     */
    this.allowedPurposeIds = [];

    /**
     * List of vendor IDs that the user has given consent to
     *
     * @type {integer[]}
     */
    this.allowedVendorIds = [];

    // Decode the base string
    if (baseString) {
      Object.assign(this, decodeConsentString(baseString));
    }
  }
  /**
   * Get the web-safe, base64-encoded consent string
   *
   * @return {string} Web-safe, base64-encoded consent string
   */







var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _arrayFrom = Array.from || function () {
  var isCallable = function isCallable(fn) {
    return typeof fn === 'function';
  };

  var toInteger = function toInteger(value) {
    var number = Number(value);

    if (isNaN(number)) {
      return 0;
    }

    if (number === 0 || !isFinite(number)) {
      return number;
    }

    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };

  var maxSafeInteger = Math.pow(2, 53) - 1;

  var toLength = function toLength(value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };

  var iteratorProp = function iteratorProp(value) {
    if (value != null) {
      if (['string', 'number', 'boolean', 'symbol'].indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) > -1) {
        return Symbol.iterator;
      } else if (typeof Symbol !== 'undefined' && 'iterator' in Symbol && Symbol.iterator in value) {
        return Symbol.iterator;
      } else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };

  var getMethod = function getMethod(O, P) {
    if (O != null && P != null) {
      var func = O[P];

      if (func == null) {
        return void 0;
      }

      if (!isCallable(func)) {
        throw new TypeError(func + " is not a function");
      }

      return func;
    }
  };

  var iteratorStep = function iteratorStep(iterator) {
    var result = iterator.next();
    var done = Boolean(result.done);

    if (done) {
      return false;
    }

    return result;
  };

  return function from(items) {
    

    var C = this;
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;
    var T;

    if (typeof mapFn !== 'undefined') {
      if (!isCallable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      }

      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    var A, k;
    var usingIterator = getMethod(items, iteratorProp(items));

    if (usingIterator !== void 0) {
      A = isCallable(C) ? Object(new C()) : [];
      var iterator = usingIterator.call(items);

      if (iterator == null) {
        throw new TypeError("Array.from requires an array-like or iterable object");
      }

      k = 0;
      var next, nextValue;

      while (true) {
        next = iteratorStep(iterator);

        if (!next) {
          A.length = k;
          return A;
        }

        nextValue = next.value;

        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        } else {
          A[k] = nextValue;
        }

        k++;
      }
    } else {
      var arrayLike = Object(items);

      if (items == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      var len = toLength(arrayLike.length);
      A = isCallable(C) ? Object(new C(len)) : new Array(len);
      k = 0;
      var kValue;

      while (k < len) {
        kValue = arrayLike[k];

        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k++;
      }

      A.length = len;
    }

    return A;
}();

var _require = __webpack_require__(4),
    ConsentString = _require.ConsentString;

var _require2 = __webpack_require__(0),
    decodeConsentString = _require2.decodeConsentString;

var _require3 = __webpack_require__(1),
    encodeConsentString = _require3.encodeConsentString;

	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var d;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
};

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
	grabConsent();
// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}