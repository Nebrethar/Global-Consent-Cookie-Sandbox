'use strict';

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
    "use strict";

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