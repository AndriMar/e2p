'use strict';
var Q = require('q');

function addEvent(eventObject, event, func) {
    this.promiseDb = [];
    this.match = function () {
        return true;
    }
    var that = this;
    eventObject.on(event, function(data) {
        that.promiseDb.forEach(function(p) {
            if (that.match(data, p.input)) {
                p.promise.resolve(data);
            }
        });
    });
    var promiseFunction = function(input) {
        var deferred = Q.defer();
        var e2pItem = {
            promise: deferred,
            input: input
        };
        that.promiseDb.push(e2pItem);
        func(input);
        return deferred.promise;
    };
    promiseFunction.match = function(func) {
        that.match = func;
        return promiseFunction;
    };
    return promiseFunction;
}

module.exports = {
    wrapFunction: addEvent
};
