var sys          = require('sys');
var path         = require('path');
var events       = require('events');
var http         = require('http');
var twitter-node = require('../deps/twitter-node');

var twitcollect = exports;

/**
 * The Rater keeps a list of identifiers and the ratings assigned to 
 * it.
 * @constructor
 */
twitcollect.Collector = function(counter, rater) {
    this.counter = counter;
    this.rater = rater;
    this.twitter  = new twitter-node.TwitterNode({
	user: 'noylitics', 
	password: 'n0ylitics',
	track: ['convergese']
    });
};

twitcollect.Collector.prototype = {
    

};
