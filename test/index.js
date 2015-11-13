var assert = require('assert');
var events = require('events');
var e2p = require('../');
describe('Testing event conversion to promise', function(done) {
	var eventEmitter;
    beforeEach(function() {
    	eventEmitter = new events.EventEmitter();
		// e2p.setEventObject(eventEmitter);
    });
    it('should resolve promis whene event is fired', function() {
        var wrapedFunction = new e2p.wrapFunction(eventEmitter,'data', function() {});
        var promise = wrapedFunction();
        promise.then(function(data) {
            assert.equal(data, 'data');
            done();
        }).fail(done);
        eventEmitter.emit('data', 'data');

    });

    it('event emit test', function(done) {
        eventEmitter.on('event', function(data) {
            assert.equal(data, 'data');
            done();
        });
        eventEmitter.emit('event', 'data');
    });

    it('should not resolve if not matching match function', function(done) {
        var id = '12345';
        var wrapedFunction = e2p.wrapFunction(eventEmitter,'data', function() {})
        .match(function (output,input) {
            return output === input;
        });
        var promise = wrapedFunction('abcde');
        promise.then(function(data) {
            assert.equal(data, 'abcde');
            done();
        }).fail(done);
        var promise2 = wrapedFunction('abcde2');
        promise2.then(function(data) {
            assert.equal(data, 'abcde2');
            done();
        }).fail(done);
        eventEmitter.emit('data', 'abcde2');
    });
});
