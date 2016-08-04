  // identity - returns the same value that is used as the argument
  _.identity = function(val) {
    return val;
  };

  // ----- COLLECTIONS ------ //

  // first - Returns the first element in an array
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // last - Returns the last element in an array
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : array.slice(Math.max(0, array.length-n))
  };

  // each - Iterates over a list, and applies a callback function to each element
  _.each = function(collection, iterator) {
    if (collection.constructor === Array) {
      for (var i = 0; i < collection.length; i++) {
        var index = i;
        iterator(collection[i], index, collection);
      }
    } else if (collection.constructor === Object){
      for(var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // indexOf - Returns the index of the value provided within an array. Will return -1 if the item is not found
  _.indexOf = function(array, target){
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // filter - Looks through each value in a list and returns an array of all the values that pass a given test
  _.filter = function(collection, test) {
    var newArray = [];
    for (var i = 0; i < collection.length; i++) {
      if (test(collection[i])) {
        newArray.push(collection[i]);
      }
    }
    return newArray;
  };

  // reject - Opposite of filter. Returns an array of values that do not pass a given test
  _.reject = function(collection, test) {
    return _.filter(collection, function(item) {
      return !test(item);
    });
  };

  // uniq - Creates an array without including duplicates of the given array
  _.uniq = function(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      if (newArray.includes(array[i]) === false) {
        newArray.push(array[i])
      }
    }
    return newArray;
  };


  // map - Similar to each, but returns a new array with all the values modified by the given callback
  _.map = function(collection, iterator) {
    var newArray = [];
      for (var i = 0; i < collection.length; i++) {
        newArray.push(iterator(collection[i]));
      }
      return newArray;
  };

  // pluck - Returns a list of a specified property
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // reduce - Boils down a list of values into a single value
  _.reduce = function(collection, iterator, accumulator) {
    var initialized = accumulator === undefined;
    _.each(collection, function(value) {
      if (initialized) {
        accumulator = value;
        initialized = false;
      } else {
        accumulator = iterator(accumulator, value);
      }
    });
    return accumulator;
  };

  // contains - Returns true if the specified value is in the list
  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // every - Returns true if all values in the list pass a predicate truth test
  _.every = function(collection, iterator) {
    iterator = iterator || _.identity;
    return !!_.reduce(collection, function(test, item) {
      return test && iterator(item);
    }, true);
  };

  // some - Returns true if any values in the list pass a predicate truth test
  _.some = function(collection, iterator) {
    iterator = iterator || _.identity;
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        return true;
      }
    }
    return false;
  };

  // shuffle - Returns a shuffled copy of the list, without altering the old list
  _.shuffle = function(array) {
    var newArray = array.slice();
    var output = [];
    var used = [];
    for (var i = 0; i < array.length; i++) {
      var newRandomNumber = Math.floor(Math.random() * newArray.length);
      output.push(newArray.splice(newRandomNumber, 1).pop());
    }
    return output;
  };

  // ----- OBJECTS ------ //

  // extend - "Copy all of the properties in the source objects over to the destination object, and return the destination object. It's in-order, so the last source will override properties of the same name in previous arguments." - From the Underscore Documentation
  _.extend = function(obj) {
    _.each(arguments, function(argObject) {
      _.each(argObject, function(value, key) {
        obj[key] = value;
      })
    })
    return obj;
  };

  // defaults - Fills in undefined properties in an object with the value present in a default object
  _.defaults = function(obj) {
    _.each(arguments, function(argObject) {
      _.each(argObject, function(value, key) {
        if (obj[key] === undefined) {
          obj[key] = value;
        }
      })
    })
    return obj;
  };


  // ----- FUNCTIONS ------ //

  // once - Creates a version of the function that can only be called once
  _.once = function(func) {
    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  // memoize - Caches the computed results of a function
  _.memoize = function(func) {
    var obj = {};
    return function() {
      var arg = JSON.stringify(arguments);
      if (!obj[arg]) {
        obj[arg] = func.apply(this, arguments);
      }
      return obj[arg];
    };
  };

  // delay - Invokes a function after a specified time
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };
