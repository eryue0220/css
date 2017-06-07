/**
 * @date 2017-04-12
 * @file Array.from.js
 * @desc polyfill with Array.from
 * @author Cinchen
 */

var ArrayFrom = (function() {
	var toStr = Object.prototype.toString;
	var isCallable = function(func) {
		return typeof func === 'function' || toStr.call(func) === '[object Function]';
	};

	var toInteger = function(value) {
		var number = Number(value);
		if (isNaN(value)) return 0;
		if (number === 0 || !isFinite(number)) return number;
		return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	};

	var maxSafeInteger = Math.pow(2, 53) - 1;
	var toLength = function(value) {
		return Math.min(Math.max(toInteger(value), 0), maxSafeInteger);
	};

	return function from(arrayLike) {
		var self = this;
		var items = Object(arrayLike);

		if (arrayLike === null || arrayLike === undefined) {
			throw new TypeError('Array.from requires an array-like object.');
		}

		var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
		var T;
		if (typeof mapFn !== 'undefined') {
			if (!isCallable(mapFn)) {
				throw new TypeError(
					'Array.from: when provided, the second argument should be function.'
				);
			}

			if (arguments.length > 2) {
				T = arguments[2];
			}
		}

		var len = toLength(items.length);
		var A = isCallable(self) ? Object(new self(len)) : new Array(len);
		var k = 0;
		var kValue;

		while (k < len) {
			kValue = items[k];
			if (mapFn) {
			 	A[k] = typeof T !== 'undefined' ? mapFn.call(T, kValue, k) : mapFn(kValue, k);
			} else {
				A[k] = kValue;
			}
			k += 1;
 		}

 		A.length = len;
		return A;
	};
}());