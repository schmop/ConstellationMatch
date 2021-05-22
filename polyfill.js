
String.prototype.startsWith = function(searchString, position) {
position = position || 0;
return this.indexOf(searchString, position) === position;
};

String.prototype.repeat = function(num) {
	var out = "";
	for (var i = 0; i < num; i++) {
		out += this;
	}
	
	return out;
};

Array.prototype.find = 
Object.prototype.find = function (callback) {
	for (var object of this) {
		if (callback(object)) {
			return object;
		}
	}
	return null;
};

Array.prototype.findIndex = 
Object.prototype.findIndex = function (callback) {
	for (var index in this) {
		if (callback(this[index])) {
			return index;
		}
	}
	return null;
};

Array.prototype.filter = function (callback) {
	var filtered = [];
	for (var obj of this) {
		if (callback(obj)) {
			filtered.push(obj);
		}
	}
	return filtered;
};

Object.prototype.filter = function (callback) {
	var filtered = {};
	for (var index in this) {
		if (callback(this[index], index)) {
			filtered[index] = this[index];
		}
	}
	return filtered;
};

Object.defineProperty(Object, 'assign', {
	value: function (target, varArgs) { // .length of function is 2
		if (target == null) { // TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var to = Object(target);

		for (var index = 1; index < arguments.length; index++) {
			var nextSource = arguments[index];

			if (nextSource != null) { // Skip over if undefined or null
			  for (var nextKey in nextSource) {
			    // Avoid bugs when hasOwnProperty is shadowed
			    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
			      to[nextKey] = nextSource[nextKey];
			    }
			  }
			}
		}
		return to;
	},
	writeable: true,
	configurable: true
});

var globalTimeouts = [];

function setTimeout(callback, time) {
	globalTimeouts.push({
		cb: callback,
		ts: (new Date()).getTime() + time
	});
};

function handleGlobalCallbacks() {
	var curTs = (new Date()).getTime();
	for (var timeout of globalTimeouts) {
		if (timeout.ts <= curTs) {
			timeout.cb();
			globalTimeouts.remove(timeout);
		}
	}
}
